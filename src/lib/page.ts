import Ajv, { type Schema } from "ajv";

const enum PageParameters {
  RequestOptions = "r",
  WidgetParameters = "w",
  ValidationSchema = "v",
  State = "s",
}

interface RequestOptions extends RequestInit {
  url?: string;
}

interface PageParams<WidgetParams> {
  widgetParams?: WidgetParams;
  requestOptions?: RequestOptions;
  validationSchema?: Schema;
  state?: string;
}

class Page<WidgetParams> {
  constructor(private readonly params: PageParams<WidgetParams>) {}

  get widgetParams(): WidgetParams | undefined {
    return this.params.widgetParams;
  }

  get lang(): string | undefined {
    return Telegram.WebApp.initDataUnsafe.user?.language_code;
  }

  get buttonText(): string {
    return Telegram.WebApp.MainButton.text;
  }

  syncColorScheme() {
    document.documentElement.setAttribute(
      "data-theme",
      Telegram.WebApp.colorScheme
    );
  }

  async submit(data: unknown) {
    if (typeof this.params.validationSchema !== "undefined") {
      const ajv = new Ajv();
      if (!ajv.validate(this.params.validationSchema, data)) {
        throw new Error(ajv.errorsText());
      }
    }
    const dataString = JSON.stringify({
      data,
      webAppInitData: Telegram.WebApp.initData,
      state: this.params.state,
    });
    if (this.params.requestOptions?.url) {
      await fetch(this.params.requestOptions.url, {
        method: "POST",
        ...this.params.requestOptions,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          ...this.params.requestOptions?.headers,
        },
        body: dataString,
      });
    } else {
      Telegram.WebApp.sendData(dataString);
    }
  }
}

function parseWidgetParams<WidgetParams>(
  searchParams: URLSearchParams
): WidgetParams | undefined {
  const str = searchParams.get(PageParameters.WidgetParameters);
  if (!str) {
    return undefined;
  }
  return JSON.parse(str) as WidgetParams;
}

function parseRequestOptions(
  searchParams: URLSearchParams
): RequestOptions | undefined {
  const str = searchParams.get(PageParameters.RequestOptions);
  if (!str) {
    return undefined;
  }
  return JSON.parse(str) as RequestOptions;
}

function parseValidationSchema(
  searchParams: URLSearchParams
): Schema | undefined {
  const str = searchParams.get(PageParameters.ValidationSchema);
  if (!str) {
    return undefined;
  }
  const schema = JSON.parse(str) as Schema;
  const ajv = new Ajv();
  if (!ajv.validateSchema(schema)) {
    throw new Error(`Invalid validation schema: ${ajv.errorsText()}`);
  }
  return schema;
}

export async function setupPage<WidgetParams>(
  params: URLSearchParams,
  setup: (page: Page<WidgetParams>) => Promise<unknown> | unknown
) {
  try {
    const page = new Page<WidgetParams>({
      widgetParams: parseWidgetParams<WidgetParams>(params),
      requestOptions: parseRequestOptions(params),
      validationSchema: parseValidationSchema(params),
      state: params.get(PageParameters.State) || undefined,
    });
    page.syncColorScheme();
    await setup(page);
    Telegram.WebApp.ready();
  } catch (err) {
    alert(err instanceof Error ? err.message : String(err));
  }
}
