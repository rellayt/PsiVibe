import { SnackbarType } from '../../models/Snackbar.model';

export class SnackbarMessage {
	static readonly AUTHENTICATE_ERROR = { content: 'Błąd uwierzytelniania', type: SnackbarType.ERROR };

	static readonly LOGIN_SUCCESS = { content: 'Zalogowano', type: SnackbarType.SUCCESS };

	static readonly LOGIN_ERROR = { content: 'Błędne dane', type: SnackbarType.ERROR };

	static readonly LOGOUT = { content: 'Wylogowano', type: SnackbarType.SUCCESS };

	static readonly CREATE_PROJECT_SUCCESS = { content: 'Utworzono projekt', type: SnackbarType.SUCCESS };

	static readonly STANDARD_ERROR = { content: 'Wystąpił błąd', type: SnackbarType.ERROR };

	static readonly UPDATE_PERSONAL_DATA_SUCCESS = { content: 'Zaktualizowano dane personalne', type: SnackbarType.SUCCESS };

	static readonly UPDATE_ADDRESS_SUCCESS = { content: 'Zaktualizowano adres', type: SnackbarType.SUCCESS };

	static readonly CHANGE_PASSWORD_SUCCESS = { content: 'Hasło zostało zmienione', type: SnackbarType.SUCCESS };

	static readonly CHANGE_PASSWORD_ERROR = { content: 'Hasło jest niepoprawne', type: SnackbarType.ERROR };

	static readonly TAKE_PROJECT_SUCCESS = { content: 'Projekt został przyjęty', type: SnackbarType.SUCCESS };

	static readonly CLOSE_PROJECT_SUCCESS = { content: 'Projekt został zakończony', type: SnackbarType.SUCCESS };

	static readonly TAKE_PROJECT_ERROR = { content: 'Nie udało się przyjąć projektu', type: SnackbarType.ERROR };

	static readonly CLOSE_PROJECT_ERROR = { content: 'Nie udało się zakończyć projektu', type: SnackbarType.ERROR };

	static readonly PROJECT_NOT_FOUND_ERROR = { content: 'Nie znaleziono projektu', type: SnackbarType.ERROR };

	static readonly UPLOAD_AVATAR_SUCCESS = { content: 'Zdjęcie zostało zaktualizowane', type: SnackbarType.SUCCESS };

	static readonly UPLOAD_AVATAR_ERROR = { content: 'Błąd przesyłania zdjęcia', type: SnackbarType.ERROR };
}
