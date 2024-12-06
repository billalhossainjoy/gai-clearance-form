import { Author } from "@prisma/client";

declare module "express" {
	interface Request{
		user: Author
	}
}