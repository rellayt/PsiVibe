import axios from 'axios';
import { environment } from '../../../environments';
import { HttpGetMethodOptions, HttpPostMethodOptions } from '../../base/models/http-methods.model';

export class ApiService {
	public get<K>(path: string, options?: HttpGetMethodOptions): Promise<K> {
		return axios.get(`${environment.API_URL}${path}`, options);
	}

	public post<V>(path: string, { body, formData, params }: HttpPostMethodOptions): Promise<V> {
		return axios.post(`${environment.API_URL}${path}`, body || formData, { params });
	}

	public put(): void {}
}
