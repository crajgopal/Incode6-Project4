INSERT INTO 
users(surname, firstname, email, password)
VALUES 
('Bond', 'James', 'james.bond@gmail.com' , 'b6b7fb4cad4bc020f76e16889a8e9065cb708d0f8c304a8a3db609b644da9536'),
('Stark', 'Tony', 'starkrulz@gmail.com' , 'a836ebba36776b21dd0f5cdca497bff65c5bdfc8411cfbfe0111f27bde1c1894'),
('Go', 'Ali ', 'nameisnotborat@gmail.com' , '3b5fe14857124335bb8832cc602f8edcfa12db42be36b135bef5bca47e3f2b9c');


INSERT INTO 
schedules(user_id,day, start_time, end_time)
VALUES
('1', '1', '2:00' , '20:00'),
('1', '2', '4:00' , '18:00'),
('1', '3', '2:00' , '16:00'),
('2', '1', '2:00' , '14:00'),
('3', '5', '8:00' , '16:00');

