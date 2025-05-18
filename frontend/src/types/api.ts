export type APIErrorResponse = {
    response?: {
        status?: number;
        data?: {
            error?: string;
            message?: string;
            [key: string]: unknown;
        };
    };
};

