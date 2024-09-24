import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"





export const mockinterview = pgTable("mockinterview", {
	id: serial("id").primaryKey().notNull(),
	jsonmockresp: text("jsonmockresp").notNull(),
	jobposition: varchar("jobposition", { length: 1000 }).notNull(),
	jobdescription: varchar("jobdescription", { length: 1000 }).notNull(),
	jobexp: varchar("jobexp", { length: 255 }).notNull(),
	createdby: varchar("createdby", { length: 255 }).notNull(),
	createdat: timestamp("createdat", { mode: 'string' }).defaultNow(),
	mockid: varchar("mockid", { length: 255 }).notNull(),
});

export const userAnswers = pgTable("userAnswers", {

	id: serial("id").primaryKey().notNull(),
	mockidRef: varchar('mockid').notNull(),
	question: varchar('question').notNull(),
	correctanswer: varchar('correctanswer'),
	useranswer:text('useranswer'),
	feedback:text('feedback'),
	rating:varchar('rating'),
	userEmail:varchar('userEmail'),
	createdat: varchar('createdat'),
	
});