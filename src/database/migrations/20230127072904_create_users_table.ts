import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('user', (table: Knex.TableBuilder)=>{
        table.uuid('id').primary().notNullable().unique();
        table.string('firstName').notNullable();
        table.string('lastName').notNullable();
        table.string('phoneNumber').notNullable();
        table.boolean('isVerified').defaultTo(false);
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.boolean('isDeleted').defaultTo(false);
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("user")
}

