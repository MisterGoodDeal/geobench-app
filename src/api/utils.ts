import { RequestInit, Response } from "node-fetch";

export type Fetch = (url: string, init?: RequestInit) => Promise<Response>;

