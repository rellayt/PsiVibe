interface SkipInterception {
	skipInterception?: boolean;
}

export interface HttpGetMethodOptions extends SkipInterception {
	params?: {
		[key: string]: string;
	};
	headers?: {
		[key: string]: string;
	};
}

export interface HttpPostMethodOptions extends SkipInterception {
	body?: {
		[key: string]: string | string[];
	};
	params?: {
		[key: string]: string;
	};
	formData?: FormData;
}
