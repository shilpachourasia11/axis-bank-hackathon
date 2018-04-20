import sqlite3 as sql

def insert_user(email, password):
    con = sql.connect("database.db")
    cur = con.cursor()
    cur.execute("INSERT INTO user (email, password) VALUES (?,?)", (email, password))
    con.commit()
    con.close()

def select_account_holder(params=()):
    con = sql.connect("database.db")
        # cur = con.cursor()
        # if params==():
        #     cur.execute("select * from account_holder")
        # else:
        #     string = "select"
        #     for i in xrange(len(params)-1):
        #         string += "%s,"
        #     string += "%s"
        #     string += " from account_holder"

        #     result = cur.execute(string)
    con.close()
        #     return result.fetchall()
