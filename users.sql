create table users(
   id  int(10) not null primary key auto_increment,
   fullname  varchar(10)  not null,
   email varchar(30) not null,
   password varchar(70) not null
);

insert into users(fullname, email, password)
values("홍길동", "hong@naver.com", "hong$"),
("영희야", "young@naver.com", "young$"),
("청수야", "chule@naver.com", "chule$"),
("고희동", "gooo@naver.com", "gooo$"),
("백하니", "back@naver.com", "back$");

delete from users  where id=11 and fullname="html" and email="html@naver.coselect * from users;

update users set fullname="강정수",
      email="kang@naver.com",
      password="kang$"
      where id=13;

select * from users
    -> where email="gooo@naver.com" and password="gooo$";   
select count(*) as cnt from users where email="gooo@naver.com" and password="gooo$";       