import { db } from "@/lib/db";

import Board from "./board";
import { Form } from "./form";

export const OrganizationIdPage = async () => { 
    const boards = await db.board.findMany();

    return (
        <div>
            <Form />
            <div className="flex flex-col gap-2">
                {boards.map((board) => (
                    <Board key={board.id} title={board.title} id={board.id} />
                ))}
            </div>
        </div>
    )
}


export default OrganizationIdPage;