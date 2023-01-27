import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('transaction', (table: Knex.TableBuilder)=>{
        table.uuid('id').primary().notNullable().unique();
        table.enu('tranType', ['credit', 'debit']).notNullable();
        table.enu('status', ['pending', 'approved']).notNullable();
        table.string('reference').notNullable();
        table.decimal('amount',19,4).notNullable();
        table.uuid('senderId').references('id').inTable('user');
        table.uuid('receiverId').references('id').inTable('user');
        table.string('description').notNullable();
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("transaction")
}

