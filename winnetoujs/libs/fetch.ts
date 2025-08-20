/**
 * Fetch wrapper for common HTTP methods
 */

export interface FetchOptions {
  headers?: Record<string, string>;
  timeout?: number;
  baseURL?: string;
}

export interface PostOptions extends FetchOptions {
  contentType?:
    | "application/json"
    | "application/x-www-form-urlencoded"
    | "multipart/form-data";
}

export class FetchWrapper {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private timeout: number;

  constructor(options: FetchOptions = {}) {
    this.baseURL = options.baseURL || "";
    this.defaultHeaders = options.headers || {};
    this.timeout = options.timeout || 10000;
  }

  private buildURL(endpoint: string): string {
    if (endpoint.startsWith("http")) {
      return endpoint;
    }
    return `${this.baseURL}${endpoint}`;
  }

  private async makeRequest(
    url: string,
    options: RequestInit
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(`Request timeout after ${this.timeout}ms`);
      }
      throw error;
    }
  }

  /**
   * GET request
   */
  async get<T = any>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const url = this.buildURL(endpoint);

    const response = await this.makeRequest(url, {
      method: "GET",
      headers: options.headers,
    });

    if (!response.ok) {
      throw new Error(`GET ${endpoint} failed with status ${response.status}`);
    }

    return response.json();
  }

  /**
   * POST request
   */
  async post<T = any>(
    endpoint: string,
    data?: any,
    options: PostOptions = {}
  ): Promise<T> {
    const url = this.buildURL(endpoint);
    const contentType = options.contentType || "application/json";

    let body: string | FormData | URLSearchParams;
    let headers = { ...options.headers };

    if (contentType === "application/json") {
      body = JSON.stringify(data);
      headers["Content-Type"] = "application/json";
    } else if (contentType === "application/x-www-form-urlencoded") {
      body = new URLSearchParams(data);
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    } else if (contentType === "multipart/form-data") {
      body = data instanceof FormData ? data : new FormData();
      // Don't set Content-Type for FormData, let browser set it with boundary
    } else {
      body = data;
    }

    const response = await this.makeRequest(url, {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`POST ${endpoint} failed with status ${response.status}`);
    }

    return response.json();
  }
}

// Create a default instance
const defaultFetch = new FetchWrapper();

/**
 * Simple GET function
 */
export const get = <T = any>(
  endpoint: string,
  options?: FetchOptions
): Promise<T> => {
  return defaultFetch.get<T>(endpoint, options);
};

/**
 * Simple POST function
 */
export const post = <T = any>(
  endpoint: string,
  data?: any,
  options?: PostOptions
): Promise<T> => {
  return defaultFetch.post<T>(endpoint, data, options);
};

/**
 * Create a new fetch instance with custom configuration
 */
export const createFetch = (options: FetchOptions): FetchWrapper => {
  return new FetchWrapper(options);
};
