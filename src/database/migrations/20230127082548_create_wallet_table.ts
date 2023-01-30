import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('wallet', (table: Knex.TableBuilder)=>{
        table.uuid('id').primary().notNullable().unique();
        table.string('walletID').notNullable().unique();
        table.decimal('balance', 19, 4).notNullable().defaultTo(0, { constraintName: 'df_wallet_value' });
        table.uuid('userId').references('id').inTable('user').onDelete('CASCADE');
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("wallet")
}

