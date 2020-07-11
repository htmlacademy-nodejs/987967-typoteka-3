psql -f C:\@work\0Learn\0myHTMLAcademy\987967-typoteka-3\sql\create-database.sql postgres postgres
psql -f C:\@work\0Learn\0myHTMLAcademy\987967-typoteka-3\sql\schema.sql typoteka typoteka
psql --command="\encoding UTF8" -f C:\@work\0Learn\0myHTMLAcademy\987967-typoteka-3\sql\fill-db.sql typoteka typoteka
psql --command="\encoding UTF8" --command="select * from categories;" typoteka typoteka
psql typoteka typoteka
