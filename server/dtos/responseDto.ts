export class ResponseDTO {
    type: string;
    status: number;
    message: string;
    data: any;

    constructor(type: string, status: number, message: string, data: any = null) {
        this.type = type; // "Success" or "Error"
        this.status = status; // HTTP status code
        this.message = message; // Human-readable message
        this.data = data; // Data to be returned in the response (in case it is successful), or error details (in case of an error)
    }

    sendResponse(res: any): void {
        if (this.type === "Success") {
            res.status(this.status).json({
                type: this.type,
                message: this.message,
                data: this.data
            });
        } else {
            res.status(this.status).json({
                type: this.type,
                message: this.message,
                error: this.data
            });
        }

    }
}