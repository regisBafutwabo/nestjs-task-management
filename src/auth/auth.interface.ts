export namespace IAuth {
    export interface JwtPayload {
        username: string;
    }

    export interface SignInResponse {
        accessToken: string;
    }
}
