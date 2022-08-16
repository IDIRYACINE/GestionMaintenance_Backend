import { MariaDb } from "./MariaDb/MariaDb"

/**
 * 
 * Use this module to switch databases implemetations
 * without affecting dependencies
 * 
 */

export const database : Database = MariaDb