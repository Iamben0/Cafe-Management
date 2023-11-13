INSERT INTO user_profile (profile_type, job_title, active) VALUES
('admin'   , 'senior system admin' , TRUE)  ,
('admin'   , 'junior system admin' , TRUE)  ,
('owner'   , 'owner'               , TRUE)  ,
('manager' , 'senior manager'      , TRUE)  ,
('manager' , 'junior manager'      , TRUE)  ,
('staff'   , 'junior staff'        , TRUE)  ,
('staff'   , 'senior staff'        , TRUE);


INSERT INTO user_account (username, name, password, email, active, role, user_profile_id) VALUES
('admin1'    , 'Robert Downey'      , 'passwordA1'  , 'ironman@gmail.com'         , TRUE , 'non-staff' , 1)   ,
('admin2'    , 'Chris Evans'        , 'passwordA2'  , 'captamerica@gmail.com'     , TRUE , 'non-staff' , 2)   ,
('owner1'    , 'Chris Hemsworth'    , 'passwordO1'  , 'thor@gmail.com'            , TRUE , 'non-staff' , 3)   ,
('manager1'  , 'Scarlett Johansson' , 'passwordM1'  , 'blackwidow@gmail.com'      , TRUE , 'non-staff' , 4)   ,
('manager2'  , 'Jeremy Renner'      , 'passwordM2'  , 'hawkeye@gmail.com'         , TRUE , 'non-staff' , 5)   ,
('staff1'    , 'person1'            , 'password1'   , 'person1@gmail.com'         , TRUE , 'chef'      , 6)   ,
('staff2'    , 'person2'            , 'password2'   , 'person2@gmail.com'         , TRUE , 'waiter'    , 7)   ,
('staff3'    , 'person3'            , 'password3'   , 'person3@gmail.com'         , TRUE , 'cashier'   , 6)   ,
('staff4'    , 'person4'            , 'password4'   , 'person4@gmail.com'         , TRUE , 'chef'      , 7)   ,
('staff5'    , 'person5'            , 'password5'   , 'person5@gmail.com'         , TRUE , 'waiter'    , 6)   ,
('staff6'    , 'person6'            , 'password6'   , 'person6@gmail.com'         , TRUE , 'cashier'   , 7)   ,
('staff7'    , 'person7'            , 'password7'   , 'person7@gmail.com'         , TRUE , 'chef'      , 6)   ,
('staff8'    , 'person8'            , 'password8'   , 'person8@gmail.com'         , TRUE , 'waiter'    , 7)   ,
('staff9'    , 'person9'            , 'password9'   , 'person9@gmail.com'         , TRUE , 'cashier'   , 6)   ,
('staff10'   , 'person10'           , 'password10'  , 'person10@gmail.com'        , TRUE , 'chef'      , 7)   ,
('staff11'   , 'person11'           , 'password11'  , 'person11@gmail.com'        , TRUE , 'waiter'    , 6)   ,
('staff12'   , 'person12'           , 'password12'  , 'person12@gmail.com'        , TRUE , 'cashier'   , 7)   ,
('staff13'   , 'person13'           , 'password13'  , 'person13@gmail.com'        , TRUE , 'chef'      , 6)   ,
('staff14'   , 'person14'           , 'password14'  , 'person14@gmail.com'        , TRUE , 'waiter'    , 7)   ,
('staff15'   , 'person15'           , 'password15'  , 'person15@gmail.com'        , TRUE , 'cashier'   , 6)   ,
('staff16'   , 'person16'           , 'password16'  , 'person16@gmail.com'        , TRUE , 'chef'      , 7)   ,
('staff17'   , 'person17'           , 'password17'  , 'person17@gmail.com'        , TRUE , 'waiter'    , 6)   ,
('staff18'   , 'person18'           , 'password18'  , 'person18@gmail.com'        , TRUE , 'cashier'   , 7)   ,
('staff19'   , 'person19'           , 'password19'  , 'person19@gmail.com'        , TRUE , 'chef'      , 6)   ,
('staff20'   , 'person20'           , 'password20'  , 'person20@gmail.com'        , TRUE , 'waiter'    , 7)   ,
('staff21'   , 'person21'           , 'password21'  , 'person21@gmail.com'        , TRUE , 'cashier'   , 6)   ,
('staff22'   , 'person22'           , 'password22'  , 'person22@gmail.com'        , TRUE , 'chef'      , 7)   ,
('staff23'   , 'person23'           , 'password23'  , 'person23@gmail.com'        , TRUE , 'waiter'    , 6)   ,
('staff24'   , 'person24'           , 'password24'  , 'person24@gmail.com'        , TRUE , 'cashier'   , 7)   ,
('staff25'   , 'person25'           , 'password25'  , 'person25@gmail.com'        , TRUE , 'chef'      , 6)   ,
('staff26'   , 'person26'           , 'password26'  , 'person26@gmail.com'        , TRUE , 'waiter'    , 7)   ,
('staff27'   , 'person27'           , 'password27'  , 'person27@gmail.com'        , TRUE , 'cashier'   , 6)   ,
('staff28'   , 'person28'           , 'password28'  , 'person28@gmail.com'        , TRUE , 'chef'      , 7)   ,
('staff29'   , 'person29'           , 'password29'  , 'person29@gmail.com'        , TRUE , 'waiter'    , 6)   ,
('staff30'   , 'person30'           , 'password30'  , 'person30@gmail.com'        , TRUE , 'cashier'   , 7)   ,
('staff31'   , 'person31'           , 'password31'  , 'person31@gmail.com'        , TRUE , 'chef'      , 6)   ,
('staff32'   , 'person32'           , 'password32'  , 'person32@gmail.com'        , TRUE , 'waiter'    , 7)   ,
('staff33'   , 'person33'           , 'password33'  , 'person33@gmail.com'        , TRUE , 'cashier'   , 6)   ,
('staff34'   , 'person34'           , 'password34'  , 'person34@gmail.com'        , TRUE , 'chef'      , 7)   ,
('staff35'   , 'person35'           , 'password35'  , 'person35@gmail.com'        , TRUE , 'waiter'    , 6)   ,
('staff36'   , 'person36'           , 'password36'  , 'person36@gmail.com'        , TRUE , 'cashier'   , 7)   ,
('staff37'   , 'person37'           , 'password37'  , 'person37@gmail.com'        , TRUE , 'chef'      , 6)   ,
('staff38'   , 'person38'           , 'password38'  , 'person38@gmail.com'        , TRUE , 'waiter'    , 7)   ,
('staff39'   , 'person39'           , 'password39'  , 'person39@gmail.com'        , TRUE , 'cashier'   , 6)   ,
('staff40'   , 'person40'           , 'password40'  , 'person40@gmail.com'        , TRUE , 'chef'      , 7)   ,
('staff41'   , 'person41'           , 'password41'  , 'person41@gmail.com'        , TRUE , 'waiter'    , 6)   ,
('staff42'   , 'person42'           , 'password42'  , 'person42@gmail.com'        , TRUE , 'cashier'   , 7)   ,
('staff43'   , 'person43'           , 'password43'  , 'person43@gmail.com'        , TRUE , 'chef'      , 6)   ,
('staff44'   , 'person44'           , 'password44'  , 'person44@gmail.com'        , TRUE , 'waiter'    , 7)   ,
('staff45'   , 'person45'           , 'password45'  , 'person45@gmail.com'        , TRUE , 'cashier'   , 6)   ,
('staff46'   , 'person46'           , 'password46'  , 'person46@gmail.com'        , TRUE , 'chef'      , 7)   ,
('staff47'   , 'person47'           , 'password47'  , 'person47@gmail.com'        , TRUE , 'waiter'    , 6)   ,
('staff48'   , 'person48'           , 'password48'  , 'person48@gmail.com'        , TRUE , 'cashier'   , 7)   ,
('staff49'   , 'person49'           , 'password49'  , 'person49@gmail.com'        , TRUE , 'chef'      , 6)   ,
('staff50'   , 'person50'           , 'password50'  , 'person50@gmail.com'        , TRUE , 'waiter'    , 7)   ,
('staff51'   , 'person51'           , 'password51'  , 'person51@gmail.com'        , TRUE , 'cashier'   , 6)   ,
('staff52'   , 'person52'           , 'password52'  , 'person52@gmail.com'        , TRUE , 'chef'      , 7)   ,
('staff53'   , 'person53'           , 'password53'  , 'person53@gmail.com'        , TRUE , 'waiter'    , 6)   ,
('staff54'   , 'person54'           , 'password54'  , 'person54@gmail.com'        , TRUE , 'cashier'   , 7)   ,
('staff55'   , 'person55'           , 'password55'  , 'person55@gmail.com'        , TRUE , 'chef'      , 6)   ,
('staff56'   , 'person56'           , 'password56'  , 'person56@gmail.com'        , TRUE , 'waiter'    , 7)   ,
('staff57'   , 'person57'           , 'password57'  , 'person57@gmail.com'        , TRUE , 'cashier'   , 6)   ,
('staff58'   , 'person58'           , 'password58'  , 'person58@gmail.com'        , TRUE , 'chef'      , 7)   ,
('staff59'   , 'person59'           , 'password59'  , 'person59@gmail.com'        , TRUE , 'waiter'    , 6)   ,
('staff60'   , 'person60'           , 'password60'  , 'person60@gmail.com'        , TRUE , 'cashier'   , 7)   ,
('staff61'   , 'person61'           , 'password61'  , 'person61@gmail.com'        , TRUE , 'chef'      , 6)   ,
('staff62'   , 'person62'           , 'password62'  , 'person62@gmail.com'        , TRUE , 'waiter'    , 7)   ,
('staff63'   , 'person63'           , 'password63'  , 'person63@gmail.com'        , TRUE , 'cashier'   , 6)   ,
('staff64'   , 'person64'           , 'password64'  , 'person64@gmail.com'        , TRUE , 'chef'      , 7)   ,
('staff65'   , 'person65'           , 'password65'  , 'person65@gmail.com'        , TRUE , 'waiter'    , 6)   ,
('staff66'   , 'person66'           , 'password66'  , 'person66@gmail.com'        , TRUE , 'cashier'   , 7)   ,
('staff67'   , 'person67'           , 'password67'  , 'person67@gmail.com'        , TRUE , 'chef'      , 6)   ,
('staff68'   , 'person68'           , 'password68'  , 'person68@gmail.com'        , TRUE , 'waiter'    , 7)   ,
('staff69'   , 'person69'           , 'password69'  , 'person69@gmail.com'        , TRUE , 'cashier'   , 6)   ,
('staff70'   , 'person70'           , 'password70'  , 'person70@gmail.com'        , TRUE , 'chef'      , 7)   ,
('manager3'  , 'manager person3'    , 'passwordM3'  , 'managerperson3@gmail.com'  , TRUE , 'non-staff' , 4)   ,
('manager4'  , 'manager person4'    , 'passwordM4'  , 'managerperson4@gmail.com'  , TRUE , 'non-staff' , 5)   ,
('manager5'  , 'manager person5'    , 'passwordM5'  , 'managerperson5@gmail.com'  , TRUE , 'non-staff' , 5)   ,
('manager6'  , 'manager person6'    , 'passwordM6'  , 'managerperson6@gmail.com'  , TRUE , 'non-staff' , 5)   ,
('manager7'  , 'manager person7'    , 'passwordM7'  , 'managerperson7@gmail.com'  , TRUE , 'non-staff' , 5)   ,
('manager8'  , 'manager person8'    , 'passwordM8'  , 'managerperson8@gmail.com'  , TRUE , 'non-staff' , 5)   ,
('manager9'  , 'manager person9'    , 'passwordM9'  , 'managerperson9@gmail.com'  , TRUE , 'non-staff' , 5)   ,
('manager10' , 'manager person10'   , 'passwordM10' , 'managerperson10@gmail.com' , TRUE , 'non-staff' , 5)   ,
('manager11' , 'manager person11'   , 'passwordM11' , 'managerperson11@gmail.com' , TRUE , 'non-staff' , 4)   ,
('manager12' , 'manager person12'   , 'passwordM12' , 'managerperson12@gmail.com' , TRUE , 'non-staff' , 5)   ,
('manager13' , 'manager person13'   , 'passwordM13' , 'managerperson13@gmail.com' , TRUE , 'non-staff' , 5)   ,
('manager14' , 'manager person14'   , 'passwordM14' , 'managerperson14@gmail.com' , TRUE , 'non-staff' , 5)   ,
('manager15' , 'manager person15'   , 'passwordM15' , 'managerperson15@gmail.com' , TRUE , 'non-staff' , 5)   ,
('manager16' , 'manager person16'   , 'passwordM16' , 'managerperson16@gmail.com' , TRUE , 'non-staff' , 5)   ,
('manager17' , 'manager person17'   , 'passwordM17' , 'managerperson17@gmail.com' , TRUE , 'non-staff' , 5)   ,
('manager18' , 'manager person18'   , 'passwordM18' , 'managerperson18@gmail.com' , TRUE , 'non-staff' , 5)   ,
('manager19' , 'manager person19'   , 'passwordM19' , 'managerperson19@gmail.com' , TRUE , 'non-staff' , 5)   ,
('manager20' , 'manager person20'   , 'passwordM20' , 'managerperson20@gmail.com' , TRUE , 'non-staff' , 5)   ,
('owner2'    , 'owner person2'      , 'passwordO2'  , 'ownerperson2@gmail.com'    , TRUE , 'non-staff' , 3)   ,
('owner3'    , 'owner person3'      , 'passwordO3'  , 'ownerperson3@gmail.com'    , TRUE , 'non-staff' , 3)   ,
('owner4'    , 'owner person4'      , 'passwordO4'  , 'ownerperson4@gmail.com'    , TRUE , 'non-staff' , 3)   ,
('owner5'    , 'owner person5'      , 'passwordO5'  , 'ownerperson5@gmail.com'    , TRUE , 'non-staff' , 3)   ,
('owner6'    , 'owner person6'      , 'passwordO6'  , 'ownerperson6@gmail.com'    , TRUE , 'non-staff' , 3)   ,
('owner7'    , 'owner person7'      , 'passwordO7'  , 'ownerperson7@gmail.com'    , TRUE , 'non-staff' , 3)   ,
('owner8'    , 'owner person8'      , 'passwordO8'  , 'ownerperson8@gmail.com'    , TRUE , 'non-staff' , 3)   ,
('owner9'    , 'owner person9'      , 'passwordO9'  , 'ownerperson9@gmail.com'    , TRUE , 'non-staff' , 3)   ,
('owner10'   , 'owner person10'     , 'passwordO10' , 'ownerperson10@gmail.com'   , TRUE , 'non-staff' , 3)   ,
('staff71'   , 'person71'           , 'password71'  , 'person71@gmail.com'        , TRUE , 'un-assign' , 6)   ,
('staff72'   , 'person72'           , 'password72'  , 'person72@gmail.com'        , TRUE , 'un-assign' , 7)   ,
('staff73'   , 'person73'           , 'password73'  , 'person73@gmail.com'        , TRUE , 'un-assign' , 6)   ,
('staff74'   , 'person74'           , 'password74'  , 'person74@gmail.com'        , TRUE , 'un-assign' , 7)   ,
('staff75'   , 'person75'           , 'password75'  , 'person75@gmail.com'        , TRUE , 'un-assign' , 6)   ,
('staff76'   , 'person76'           , 'password76'  , 'person76@gmail.com'        , TRUE , 'un-assign' , 7)   ,
('staff77'   , 'person77'           , 'password77'  , 'person77@gmail.com'        , TRUE , 'un-assign' , 6)   ,
('staff78'   , 'person78'           , 'password78'  , 'person78@gmail.com'        , TRUE , 'un-assign' , 7)   ,
('staff79'   , 'person79'           , 'password79'  , 'person79@gmail.com'        , TRUE , 'un-assign' , 6)   ,
('staff80'   , 'person80'           , 'password80'  , 'person80@gmail.com'        , TRUE , 'un-assign' , 7)   ,
('staff81'   , 'person81'           , 'password81'  , 'person81@gmail.com'        , TRUE , 'un-assign' , 6)   ,
('staff82'   , 'person82'           , 'password82'  , 'person82@gmail.com'        , TRUE , 'un-assign' , 7)   ,
('staff83'   , 'person83'           , 'password83'  , 'person83@gmail.com'        , TRUE , 'un-assign' , 6)   ,
('staff84'   , 'person84'           , 'password84'  , 'person84@gmail.com'        , TRUE , 'un-assign' , 7)   ,
('staff85'   , 'person85'           , 'password85'  , 'person85@gmail.com'        , TRUE , 'un-assign' , 6)   ,
('staff86'   , 'person86'           , 'password86'  , 'person86@gmail.com'        , TRUE , 'un-assign' , 7)   ,
('staff87'   , 'person87'           , 'password87'  , 'person87@gmail.com'        , TRUE , 'un-assign' , 6)   ,
('staff88'   , 'person88'           , 'password88'  , 'person88@gmail.com'        , TRUE , 'un-assign' , 7)   ,
('staff89'   , 'person89'           , 'password89'  , 'person89@gmail.com'        , TRUE , 'un-assign' , 6)   ,
('staff90'   , 'person90'           , 'password90'  , 'person90@gmail.com'        , TRUE , 'un-assign' , 7)   ,
('staff91'   , 'person91'           , 'password91'  , 'person91@gmail.com'        , TRUE , 'un-assign' , 6)   ,
('staff92'   , 'person92'           , 'password92'  , 'person92@gmail.com'        , TRUE , 'un-assign' , 7)   ,
('staff93'   , 'person93'           , 'password93'  , 'person93@gmail.com'        , TRUE , 'un-assign' , 6)   ,
('staff94'   , 'person94'           , 'password94'  , 'person94@gmail.com'        , TRUE , 'un-assign' , 7)   ,
('staff95'   , 'person95'           , 'password95'  , 'person95@gmail.com'        , TRUE , 'un-assign' , 6)   ,
('staff96'   , 'person96'           , 'password96'  , 'person96@gmail.com'        , TRUE , 'un-assign' , 7)   ,
('staff97'   , 'person97'           , 'password97'  , 'person97@gmail.com'        , TRUE , 'un-assign' , 6)   ,
('staff98'   , 'person98'           , 'password98'  , 'person98@gmail.com'        , TRUE , 'un-assign' , 7)   ,
('staff99'   , 'person99'           , 'password99'  , 'person99@gmail.com'        , TRUE , 'un-assign' , 6)   ,
('staff100'  , 'person100'          , 'password100' , 'person100@gmail.com'       , TRUE , 'un-assign' , 7) ;


INSERT INTO work_slot (shift, role, date, assigned) VALUES
('morning'   , 'chef'    , '2023-11-13' , TRUE )    ,
('morning'   , 'waiter'  , '2023-11-13' , TRUE )    ,
('morning'   , 'cashier' , '2023-11-13' , TRUE )    ,
('afternoon' , 'chef'    , '2023-11-13' , TRUE )    ,
('afternoon' , 'waiter'  , '2023-11-13' , TRUE )    ,
('afternoon' , 'cashier' , '2023-11-13' , TRUE )    ,
('morning'   , 'chef'    , '2023-11-14' , TRUE )    ,
('morning'   , 'waiter'  , '2023-11-14' , TRUE )    ,
('morning'   , 'cashier' , '2023-11-14' , TRUE )    ,
('afternoon' , 'chef'    , '2023-11-14' , TRUE )    ,
('afternoon' , 'waiter'  , '2023-11-14' , TRUE )    ,
('afternoon' , 'cashier' , '2023-11-14' , TRUE )    ,
('morning'   , 'chef'    , '2023-11-15' , TRUE )    ,
('morning'   , 'waiter'  , '2023-11-15' , TRUE )    ,
('morning'   , 'cashier' , '2023-11-15' , TRUE )    ,
('afternoon' , 'chef'    , '2023-11-15' , TRUE )    ,
('afternoon' , 'waiter'  , '2023-11-15' , TRUE )    ,
('afternoon' , 'cashier' , '2023-11-15' , TRUE )    ,
('morning'   , 'chef'    , '2023-11-16' , TRUE )    ,
('morning'   , 'waiter'  , '2023-11-16' , TRUE )    ,
('morning'   , 'cashier' , '2023-11-16' , TRUE )    ,
('afternoon' , 'chef'    , '2023-11-16' , TRUE )    ,
('afternoon' , 'waiter'  , '2023-11-16' , TRUE )    ,
('afternoon' , 'cashier' , '2023-11-16' , TRUE )    ,
('morning'   , 'chef'    , '2023-11-17' , TRUE )    ,
('morning'   , 'waiter'  , '2023-11-17' , TRUE )    ,
('morning'   , 'cashier' , '2023-11-17' , TRUE )    ,
('afternoon' , 'chef'    , '2023-11-17' , TRUE )    ,
('afternoon' , 'waiter'  , '2023-11-17' , TRUE )    ,
('afternoon' , 'cashier' , '2023-11-17' , TRUE )    ,
('morning'   , 'chef'    , '2023-11-18' , TRUE )    ,
('morning'   , 'waiter'  , '2023-11-18' , TRUE )    ,
('morning'   , 'cashier' , '2023-11-18' , TRUE )    ,
('afternoon' , 'chef'    , '2023-11-18' , TRUE )    ,
('afternoon' , 'waiter'  , '2023-11-18' , TRUE )    ,
('afternoon' , 'cashier' , '2023-11-18' , TRUE )    ,
('morning'   , 'chef'    , '2023-11-19' , TRUE )    ,
('morning'   , 'waiter'  , '2023-11-19' , TRUE )    ,
('morning'   , 'cashier' , '2023-11-19' , TRUE )    ,
('afternoon' , 'chef'    , '2023-11-19' , TRUE )    ,
('afternoon' , 'waiter'  , '2023-11-19' , TRUE )    ,
('afternoon' , 'cashier' , '2023-11-19' , TRUE )    ,
('morning'   , 'chef'    , '2023-11-20' , TRUE )    ,
('morning'   , 'waiter'  , '2023-11-20' , TRUE )    ,
('morning'   , 'cashier' , '2023-11-20' , TRUE )    ,
('afternoon' , 'chef'    , '2023-11-20' , TRUE )    ,
('afternoon' , 'waiter'  , '2023-11-20' , TRUE )    ,
('afternoon' , 'cashier' , '2023-11-20' , TRUE )    ,
('morning'   , 'chef'    , '2023-11-21' , TRUE )    ,
('morning'   , 'waiter'  , '2023-11-21' , TRUE )    ,
('morning'   , 'cashier' , '2023-11-21' , TRUE )    ,
('afternoon' , 'chef'    , '2023-11-21' , TRUE )    ,
('afternoon' , 'waiter'  , '2023-11-21' , TRUE )    ,
('afternoon' , 'cashier' , '2023-11-21' , TRUE )    ,
('morning'   , 'chef'    , '2023-11-22' , TRUE )    ,
('morning'   , 'waiter'  , '2023-11-22' , TRUE )    ,
('morning'   , 'cashier' , '2023-11-22' , TRUE )    ,
('afternoon' , 'chef'    , '2023-11-22' , TRUE )    ,
('afternoon' , 'waiter'  , '2023-11-22' , TRUE )    ,
('afternoon' , 'cashier' , '2023-11-22' , TRUE )    ,
('morning'   , 'chef'    , '2023-11-23' , TRUE )    ,
('morning'   , 'waiter'  , '2023-11-23' , TRUE )    ,
('morning'   , 'cashier' , '2023-11-23' , TRUE )    ,
('afternoon' , 'chef'    , '2023-11-23' , TRUE )    ,
('afternoon' , 'waiter'  , '2023-11-23' , TRUE )    ,
('afternoon' , 'cashier' , '2023-11-23' , TRUE )    ,
('morning'   , 'chef'    , '2023-11-24' , TRUE )    ,
('morning'   , 'waiter'  , '2023-11-24' , TRUE )    ,
('morning'   , 'cashier' , '2023-11-24' , TRUE )    ,
('afternoon' , 'chef'    , '2023-11-24' , TRUE )    ,
('afternoon' , 'waiter'  , '2023-11-24' , FALSE )   ,
('afternoon' , 'cashier' , '2023-11-24' , FALSE )   ,
('morning'   , 'chef'    , '2023-11-25' , FALSE )   ,
('morning'   , 'waiter'  , '2023-11-25' , FALSE )   ,
('morning'   , 'cashier' , '2023-11-25' , FALSE )   ,
('afternoon' , 'chef'    , '2023-11-25' , FALSE )   ,
('afternoon' , 'waiter'  , '2023-11-25' , FALSE )   ,
('afternoon' , 'cashier' , '2023-11-25' , FALSE )   ,
('morning'   , 'chef'    , '2023-11-26' , FALSE )   ,
('morning'   , 'waiter'  , '2023-11-26' , FALSE )   ,
('morning'   , 'cashier' , '2023-11-26' , FALSE )   ,
('afternoon' , 'chef'    , '2023-11-26' , FALSE )   ,
('afternoon' , 'waiter'  , '2023-11-26' , FALSE )   ,
('afternoon' , 'cashier' , '2023-11-26' , FALSE )   ,
('morning'   , 'chef'    , '2023-11-27' , FALSE )   ,
('morning'   , 'waiter'  , '2023-11-27' , FALSE )   ,
('morning'   , 'cashier' , '2023-11-27' , FALSE )   ,
('afternoon' , 'chef'    , '2023-11-27' , FALSE )   ,
('afternoon' , 'waiter'  , '2023-11-27' , FALSE )   ,
('afternoon' , 'cashier' , '2023-11-27' , FALSE )   ,
('morning'   , 'chef'    , '2023-11-28' , FALSE )   ,
('morning'   , 'waiter'  , '2023-11-28' , FALSE )   ,
('morning'   , 'cashier' , '2023-11-28' , FALSE )   ,
('afternoon' , 'chef'    , '2023-11-28' , FALSE )   ,
('afternoon' , 'waiter'  , '2023-11-28' , FALSE )   ,
('afternoon' , 'cashier' , '2023-11-28' , FALSE )   ,
('morning'   , 'chef'    , '2023-11-29' , FALSE )   ,
('morning'   , 'waiter'  , '2023-11-29' , FALSE )   ,
('morning'   , 'cashier' , '2023-11-29' , FALSE )   ,
('afternoon' , 'chef'    , '2023-11-29' , FALSE )   ,
('afternoon' , 'waiter'  , '2023-11-29' , FALSE )   ,
('afternoon' , 'cashier' , '2023-11-29' , FALSE )   ,
('morning'   , 'waiter'  , '2023-11-30' , FALSE )   ,
('morning'   , 'cashier' , '2023-11-30' , FALSE )   ,
('afternoon' , 'chef'    , '2023-11-30' , FALSE )   ,
('afternoon' , 'waiter'  , '2023-11-30' , FALSE )   ,
('afternoon' , 'cashier' , '2023-11-30' , FALSE )   ,
('morning'   , 'chef'    , '2023-11-30' , FALSE )   ,
('morning'   , 'waiter'  , '2023-12-01' , FALSE )   ,
('morning'   , 'cashier' , '2023-12-01' , FALSE )   ,
('afternoon' , 'chef'    , '2023-12-01' , FALSE )   ,
('afternoon' , 'waiter'  , '2023-12-01' , FALSE )   ,
('afternoon' , 'cashier' , '2023-12-01' , FALSE )   ,
('morning'   , 'chef'    , '2023-12-01' , FALSE )   ,
('morning'   , 'waiter'  , '2023-12-02' , FALSE )   ,
('morning'   , 'cashier' , '2023-12-02' , FALSE )   ,
('afternoon' , 'chef'    , '2023-12-02' , FALSE )   ,
('afternoon' , 'waiter'  , '2023-12-02' , FALSE )   ,
('afternoon' , 'cashier' , '2023-12-02' , FALSE ) ;



INSERT INTO bid (work_slot_id, staff_id, status) VALUES
 (1   ,  6 , 'approved' )  ,
 (2   ,  7 , 'approved' )  ,
 (3   ,  8 , 'approved' )  ,
 (4   ,  9 , 'approved' )  ,
 (5   , 10 , 'approved' )  ,
 (6   , 11 , 'approved' )  ,
 (7   , 12 , 'approved' )  ,
 (8   , 13 , 'approved' )  ,
 (9   , 14 , 'approved' )  ,
 (10  , 15 , 'approved' )  ,
 (11  , 16 , 'approved' )  ,
 (12  , 17 , 'approved' )  ,
 (13  ,  6 , 'approved' )  ,
 (14  ,  7 , 'approved' )  ,
 (15  ,  8 , 'approved' )  ,
 (16  ,  9 , 'approved' )  ,
 (17  , 10 , 'approved' )  ,
 (18  , 11 , 'approved' )  ,
 (19  , 12 , 'approved' )  ,
 (20  , 13 , 'approved' )  ,
 (21  , 14 , 'approved' )  ,
 (22  , 15 , 'approved' )  ,
 (23  , 16 , 'approved' )  ,
 (24  , 17 , 'approved' )  ,
 (25  ,  6 , 'approved' )  ,
 (26  ,  7 , 'approved' )  ,
 (27  ,  8 , 'approved' )  ,
 (28  ,  9 , 'approved' )  ,
 (29  , 10 , 'approved' )  ,
 (30  , 11 , 'approved' )  ,
 (31  , 12 , 'approved' )  ,
 (32  , 13 , 'approved' )  ,
 (33  , 14 , 'approved' )  ,
 (34  , 15 , 'approved' )  ,
 (35  , 16 , 'approved' )  ,
 (36  , 17 , 'approved' )  ,
 (37  ,  6 , 'approved' )  ,
 (38  ,  7 , 'approved' )  ,
 (39  ,  8 , 'approved' )  ,
 (40  ,  9 , 'approved' )  ,
 (41  , 10 , 'approved' )  ,
 (42  , 11 , 'approved' )  ,
 (43  , 12 , 'approved' )  ,
 (44  , 13 , 'approved' )  ,
 (45  , 14 , 'approved' )  ,
 (46  , 15 , 'approved' )  ,
 (47  , 16 , 'approved' )  ,
 (48  , 17 , 'approved' )  ,
 (49  ,  6 , 'approved' )  ,
 (50  ,  7 , 'approved' )  ,
 (51  ,  8 , 'approved' )  ,
 (52  ,  9 , 'approved' )  ,
 (53  , 10 , 'approved' )  ,
 (54  , 11 , 'approved' )  ,
 (55  , 12 , 'approved' )  ,
 (56  , 13 , 'approved' )  ,
 (57  , 14 , 'approved' )  ,
 (58  , 15 , 'approved' )  ,
 (59  , 16 , 'approved' )  ,
 (60  , 17 , 'approved' )  ,
 (61  ,  6 , 'approved' )  ,
 (62  ,  7 , 'approved' )  ,
 (63  ,  8 , 'approved' )  ,
 (64  ,  9 , 'approved' )  ,
 (65  , 10 , 'approved' )  ,
 (66  , 11 , 'approved' )  ,
 (67  , 12 , 'approved' )  ,
 (68  , 13 , 'approved' )  ,
 (69  , 14 , 'approved' )  ,
 (70  , 15 , 'approved' )  ,
 (71  , 16 , 'pending'  )  ,
 (72  , 17 , 'pending'  )  ,
 (73  ,  6 , 'pending'  )  ,
 (74  ,  7 , 'pending'  )  ,
 (75  ,  8 , 'pending'  )  ,
 (76  ,  9 , 'pending'  )  ,
 (77  , 10 , 'pending'  )  ,
 (78  , 11 , 'pending'  )  ,
 (79  , 12 , 'pending'  )  ,
 (80  , 13 , 'pending'  )  ,
 (81  , 14 , 'pending'  )  ,
 (82  , 15 , 'pending'  )  ,
 (83  , 16 , 'pending'  )  ,
 (84  , 17 , 'pending'  )  ,
 (85  ,  6 , 'pending'  )  ,
 (86  ,  7 , 'pending'  )  ,
 (87  ,  8 , 'pending'  )  ,
 (88  ,  9 , 'pending'  )  ,
 (89  , 10 , 'pending'  )  ,
 (90  , 11 , 'pending'  )  ,
 (91  , 12 , 'pending'  )  ,
 (92  , 13 , 'pending'  )  ,
 (93  , 14 , 'pending'  )  ,
 (94  , 15 , 'pending'  )  ,
 (95  , 16 , 'pending'  )  ,
 (96  , 17 , 'pending'  )  ,
 (97  ,  6 , 'pending'  )  ,
 (98  ,  7 , 'pending'  )  ,
 (99  ,  8 , 'pending'  )  ,
 (100 ,  9 , 'pending'  )  ;




















