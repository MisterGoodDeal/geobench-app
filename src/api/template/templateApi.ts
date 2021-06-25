import { Fetch } from "../utils";
import { localStorage } from "../../services/localStorage.service";

interface ReturnTemplateParams {
  arg1: string
}
export interface TemplateApi {
  return: (returnParams: ReturnTemplateParams) => Promise<any>;
}

export const makeTemplateApi = (fetchFn: Fetch): TemplateApi => ({
  return: async (returnParams) => {
    const res = await fetchFn(`template`, {
      method: "GET",
      headers: {
        "x-auth": "my_header"
      },
      body:JSON.stringify({
        arg1: returnParams.arg1
      })
    });
    return res;
  },
});
