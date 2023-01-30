import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('token', (table: Knex.TableBuilder)=>{
        table.uuid('id').primary().notNullable().unique();
        table.string('tokenValue').notNullable().unique();
        table.enu('tokemType', ['PASSWORD_RESET','ACCOUNT_VERIFICATION']).notNullable()
          .defaultTo('ACCOUNT_VERIFICATION');
        table.uuid('userId').references('id').inTable('user').onDelete('CASCADE');
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("token")
}

