"C:\Program Files\PostgreSQL\12\bin\psql" -f C:\@work\0Learn\0myHTMLAcademy\987967-typoteka-3\sql\create-database.sql postgres postgres
"C:\Program Files\PostgreSQL\12\bin\psql" -f C:\@work\0Learn\0myHTMLAcademy\987967-typoteka-3\sql\schema.sql typoteka typoteka
"C:\Program Files\PostgreSQL\12\bin\psql" --command="\encoding UTF8" -f C:\@work\0Learn\0myHTMLAcademy\987967-typoteka-3\sql\fill-db.sql typoteka typoteka
"C:\Program Files\PostgreSQL\12\bin\psql" --command="\encoding UTF8" --command="select * from categories;" typoteka typoteka
"C:\Program Files\PostgreSQL\12\bin\psql" typoteka typoteka
