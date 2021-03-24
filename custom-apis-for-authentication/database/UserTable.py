import sqlite3

class UserTable:
    def __init__(self):
        print('UserTable class initialized')

    def create_conn(self):
        conn = sqlite3.connect('database/Insurance.db')
        return conn
        
    def create_UserTable(self, values):
        print(values)
        flag = False
        conn = self.create_conn()
        cur = conn.cursor()
        sql = "insert into UserTable(name,phone_no,policy_no,premium_date,premium_amount,address) values({});".format(values);
        print(sql)
        try:
            cur.execute(sql)
            flag = True
        except sqlite3.Error as er:
            print('SQLite error: %s' % (' '.join(er.args)))
            print("Exception class is: ", er.__class__)
            flag = False
        conn.commit()
        conn.close()
        return flag
        
    def read_UserTable(self, condition="1=1"):
        conn = self.create_conn()
        cur = conn.cursor()
        sql = "select * from UserTable where {};".format(condition)
        print(sql)
        try:
            cur.execute(sql)
        except:
            print("Something Went wrong")
        rows = cur.fetchall()
        data_dictionary = []
        indices = 0
        for row in rows:
            temp = {
                "id": row[0],
                "name": row[1],
                "phone_no": row[2],
                "policy_no": row[3],
                "premium_date": row[4],
                "premium_amount": row[5],
                "address": row[6]
            }
            data_dictionary.append(temp)
        conn.commit()
        conn.close()
        return data_dictionary     

    def update_UserTable(self, values, condition="1=1"):
        conn = self.create_conn()
        cur = conn.cursor()
        sql = "update UserTable set {} where {};".format(values, condition)
        print(sql)
        try:
            cur.execute(sql)
        except:
            print("Something Went wrong")
        conn.commit()
        conn.close()
        
    def delete_UserTable(self, condition="1=1"):
        conn = self.create_conn()
        cur = conn.cursor()
        sql = "delete from  UserTable  where {};".format(condition)
        print(sql)
        try:
            cur.execute(sql)
        except:
            print("Something Went wrong")
        conn.commit()
        conn.close()
