-- SQLBook: Code

-- Active: 1664201511757@@127.0.0.1@5432@zeng

-- SQLBook: Code

BEGIN;

INSERT INTO
    "sheet" (
        "title",
        "photo",
        "description",
        "caracteristique"
    )
VALUES (
        'Carotte',
        'https://images.pexels.com/photos/1306559/pexels-photo-1306559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec maximus justo, ut mattis turpis. Nullam odio turpis, vestibulum at consequat at, lobortis vitae nisi. Nunc euismod neque id pulvinar semper. Maecenas mi arcu, facilisis et neque sit amet, accumsan ornare ex. Curabitur ut lorem sit amet nisi lacinia tempus sit amet non velit. Pellentesque aliquet justo ex, a pellentesque sapien interdum nec. Etiam maximus iaculis odio, in ornare nisl dignissim non. Nulla vestibulum hendrerit congue. Etiam sed tincidunt nibh. Sed ultrices, erat non consequat vehicula, nulla felis pellentesque metus, ac dictum odio diam eu erat. In hac habitasse platea dictumst. Integer vel felis luctus, pellentesque dolor vitae, ultrices nulla. Aenean id ex lectus. Nunc sit amet lorem feugiat, eleifend nisl non, facilisis nibh. Cras odio nibh, bibendum at eros a, efficitur volutpat mi. Curabitur feugiat, libero vitae imperdiet suscipit, urna est tristique leo, in vestibulum justo odio sed mi.',
        '[Semis: pleine terre][Période de semis (pleine terre) : Février, Mars, Avril, Mai, Juin, Juillet][Période de récolte : Juin, Juillet, Août, Septembre, Octobre, Novembre][Culture : en pleine terre, en serre][Exposition : ensoleillée][Besoin en eau : moyen][Nature du sol : tout type de sol][Qualité du sol : drainé, meuble, riche]'
    ), (
        'Poivron',
        'https://images.pexels.com/photos/132431/pexels-photo-132431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget sagittis diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec in efficitur nisl, sollicitudin viverra orci. Cras et sapien luctus, egestas libero sed, faucibus lectus. Proin erat augue, porta ullamcorper convallis vel, viverra a mauris. Sed ut consectetur nisl, eget ultrices metus. Duis congue commodo arcu quis sodales. In lobortis hendrerit elit, at consequat metus euismod in. Vivamus eget diam ullamcorper, pellentesque dui sit amet, luctus ipsum. Sed scelerisque, velit ac congue aliquet, eros magna sollicitudin urna, et elementum nibh tortor ac turpis. Phasellus bibendum quam luctus, euismod nibh non, rhoncus libero. Praesent facilisis velit quis mi tincidunt lobortis. Nunc magna urna, tristique et lobortis ac, porttitor ac dui. Curabitur eleifend est ante, eu tincidunt diam pretium a. Donec semper justo quis lacus scelerisque, a semper diam viverra.',
        '[Semis: pleine terre][Période de semis (pleine terre) : Février, Mars, Avril, Mai, Juin, Juillet][Période de récolte : Juin, Juillet, Août, Septembre, Octobre, Novembre][Culture : en pleine terre, en serre][Exposition : ensoleillée][Besoin en eau : moyen][Nature du sol : tout type de sol][Qualité du sol : drainé, meuble, riche]'
    ), (
        'Patate',
        'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'Lorem ipsum sed ullamcorper molestie augue aliquam egestas. Sed dapibus lorem ac ex convallis venenatis. Curabitur et purus eget mi semper varius vel at lacus. In dignissim lacinia finibus. Ut sem dui, fringilla et lorem ut, bibendum pellentesque nunc. Donec faucibus, sapien vitae elementum aliquet, leo metus volutpat felis, vel interdum orci urna quis quam. Nunc volutpat at nunc nec sollicitudin. Pellentesque tristique diam in posuere malesuada. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc in metus nisi. Pellentesque dapibus efficitur placerat. Vestibulum non ligula at leo pretium pharetra a eu nisi. Proin fringilla mi non hendrerit faucibus. Donec efficitur ac risus et aliquet.',
        '[Semis: pleine terre][Période de semis (pleine terre) : Février, Mars, Avril, Mai, Juin, Juillet][Période de récolte : Juin, Juillet, Août, Septembre, Octobre, Novembre][Culture : en pleine terre, en serre][Exposition : ensoleillée][Besoin en eau : moyen][Nature du sol : tout type de sol][Qualité du sol : drainé, meuble, riche]'
    ), (
        'Haricot vert',
        'https://images.pexels.com/photos/768093/pexels-photo-768093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'Lorem ipsum quisque luctus luctus aliquet. Morbi posuere aliquet lectus, eget auctor lacus luctus id. Morbi sed faucibus magna, sit amet mollis ex. Fusce volutpat lobortis lorem a fermentum. Suspendisse potenti. Ut at lectus eu erat imperdiet faucibus sed nec est. Sed in vulputate orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus interdum ante felis, in ultrices arcu consequat eget. Curabitur porta nulla ut enim dignissim finibus. Pellentesque a aliquam nibh. In sollicitudin et nulla id sagittis. Nunc faucibus quis tortor id sagittis. Morbi vehicula lorem.',
        '[Semis: pleine terre][Période de semis (pleine terre) : Février, Mars, Avril, Mai, Juin, Juillet][Période de récolte : Juin, Juillet, Août, Septembre, Octobre, Novembre][Culture : en pleine terre, en serre][Exposition : ensoleillée][Besoin en eau : moyen][Nature du sol : tout type de sol][Qualité du sol : drainé, meuble, riche]'
    ), (
        'Framboise',
        'https://images.pexels.com/photos/52536/raspberry-fruits-fresh-red-52536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse consectetur libero quis purus accumsan, sit amet eleifend metus suscipit. Sed sed dapibus turpis. Donec eu nibh quam. Vivamus posuere quis est id placerat. Integer imperdiet neque vitae congue vulputate. Maecenas non nunc id elit posuere porttitor. Praesent congue eros magna, non porttitor nunc pulvinar ac. Fusce ac facilisis est. Ut cursus risus in nisl auctor, vel bibendum nulla lobortis. Mauris lobortis nulla eu est bibendum, eu venenatis sapien congue. Maecenas lacus sem, facilisis quis orci ac, consectetur ultrices nisl. Sed varius mattis turpis, eget fermentum mi. Phasellus egestas tristique est, vitae maximus est volutpat et. Proin dignissim pharetra ligula eget tempus. Proin placerat sed nunc sed mollis.',
        '[Semis: pleine terre][Période de semis (pleine terre) : Février, Mars, Avril, Mai, Juin, Juillet][Période de récolte : Juin, Juillet, Août, Septembre, Octobre, Novembre][Culture : en pleine terre, en serre][Exposition : ensoleillée][Besoin en eau : moyen][Nature du sol : tout type de sol][Qualité du sol : drainé, meuble, riche]'
    ), (
        'Tomate',
        'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse consectetur libero quis purus accumsan, sit amet eleifend metus suscipit. Sed sed dapibus turpis. Donec eu nibh quam. Vivamus posuere quis est id placerat. Integer imperdiet neque vitae congue vulputate. Maecenas non nunc id elit posuere porttitor. Praesent congue eros magna, non porttitor nunc pulvinar ac. Fusce ac facilisis est. Ut cursus risus in nisl auctor, vel bibendum nulla lobortis. Mauris lobortis nulla eu est bibendum, eu venenatis sapien congue. Maecenas lacus sem, facilisis quis orci ac, consectetur ultrices nisl. Sed varius mattis turpis, eget fermentum mi. Phasellus egestas tristique est, vitae maximus est volutpat et. Proin dignissim pharetra ligula eget tempus. Proin placerat sed nunc sed mollis.',
        '[Semis: pleine terre][Période de semis (pleine terre) : Février, Mars, Avril, Mai, Juin, Juillet][Période de récolte : Juin, Juillet, Août, Septembre, Octobre, Novembre][Culture : en pleine terre, en serre][Exposition : ensoleillée][Besoin en eau : moyen][Nature du sol : tout type de sol][Qualité du sol : drainé, meuble, riche]'
    ), (
        'Fraise',
        'https://images.pexels.com/photos/583840/pexels-photo-583840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor elit ut metus lacinia convallis. Nam et luctus justo, eu malesuada lorem. Nam mattis ornare fringilla. Phasellus sollicitudin orci eu arcu imperdiet mattis. Praesent ac lobortis arcu. Nunc finibus hendrerit hendrerit. Nunc non ante elit. Vivamus tempus nibh quis ante eleifend rhoncus. Etiam luctus tincidunt nisl vel blandit. Fusce id luctus tortor. Curabitur a massa arcu. Maecenas leo elit, tincidunt ac risus in, lacinia vulputate sapien. Vivamus ultricies quis dui non semper. Praesent nec viverra diam, id accumsan sapien. Sed dolor mauris, convallis sed turpis et, rutrum hendrerit ex. Fusce eget elit pellentesque, eleifend erat vitae, mattis ante.',
        '[Semis: pleine terre][Période de semis (pleine terre) : Février, Mars, Avril, Mai, Juin, Juillet][Période de récolte : Juin, Juillet, Août, Septembre, Octobre, Novembre][Culture : en pleine terre, en serre][Exposition : ensoleillée][Besoin en eau : moyen][Nature du sol : tout type de sol][Qualité du sol : drainé, meuble, riche]'
    ), (
        'Ciboulette',
        'https://images.pexels.com/photos/8599716/pexels-photo-8599716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a magna at purus gravida porttitor. Duis nec odio fermentum, sodales nisl blandit, pellentesque ipsum. Ut bibendum odio nec pretium convallis. Nulla tincidunt posuere dolor, ut blandit magna laoreet et. Vivamus interdum elit et lorem molestie vestibulum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus ac eleifend nulla. Suspendisse blandit sagittis nisl, eget efficitur urna blandit at. Nunc sed mattis lectus, dignissim aliquet augue. Mauris sapien nisl, dictum scelerisque nunc in, porttitor auctor felis. Fusce volutpat mauris id rhoncus tincidunt.',
        '[Semis: pleine terre][Période de semis (pleine terre) : Février, Mars, Avril, Mai, Juin, Juillet][Période de récolte : Juin, Juillet, Août, Septembre, Octobre, Novembre][Culture : en pleine terre, en serre][Exposition : ensoleillée][Besoin en eau : moyen][Nature du sol : tout type de sol][Qualité du sol : drainé, meuble, riche]'
    ), (
        'Thym',
        'https://images.pexels.com/photos/4207793/pexels-photo-4207793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'Lorem ipsum curabitur laoreet ex eget vestibulum tempor. Sed in arcu sit amet magna aliquam hendrerit at vel massa. Pellentesque sem elit, ullamcorper eu interdum sit amet, dignissim et mauris. Etiam semper lorem sed quam eleifend, at mollis ligula vestibulum. Etiam blandit mi nec sollicitudin porta. Morbi vehicula tincidunt vulputate. Mauris eget ultricies ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt libero eget suscipit sollicitudin. Vivamus eu dignissim orci. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce aliquam pharetra lectus. Cras porttitor ligula vel enim lobortis bibendum eget sagittis odio. Nullam faucibus odio vitae metus feugiat, ut porta turpis gravida. Pellentesque bibendum tellus a dictum tempus.',
        '[Semis: pleine terre][Période de semis (pleine terre) : Février, Mars, Avril, Mai, Juin, Juillet][Période de récolte : Juin, Juillet, Août, Septembre, Octobre, Novembre][Culture : en pleine terre, en serre][Exposition : ensoleillée][Besoin en eau : moyen][Nature du sol : tout type de sol][Qualité du sol : drainé, meuble, riche]'
    );

INSERT INTO
    "categorie" ("label")
VALUES ('fruits'), ('légumes'), ('facile'), ('herbe aromatiques');

INSERT INTO
    "action"(
        "label",
        "month_begin",
        "month_limit",
        "sheet_id"
    )
VALUES ('arroser', 6, 8, 1), ('déserber', 5, 6, 2);

INSERT INTO "role" ("label")
VALUES ('administrateur'), ('utilisateur');

INSERT INTO
    "sheet_has_categorie" ("sheet_id", "categorie_id")
VALUES (1, 2), (2, 2), (3, 2), (4, 2), (6, 2), (5, 1), (7, 1), (8, 4), (9, 4), (4, 3), (6, 3), (8, 3);

INSERT INTO
    "user" (
        "pseudo",
        "email",
        "password",
        "task_notification",
        "week_notification"
    )
VALUES (
        'bob',
        'bob@bob.bob',
        '$argon2id$v=19$m=4096,t=3,p=1$Dj+eFNo2t0gXcy3MTByb0A$jJcvF6iWIuvJSlBaA9l0fRIIt3rMPZVrc4OZr/NfH7c',
        true,
        false
    );

INSERT INTO
    "task" (
        "label",
        "begin_date",
        "limit_date",
        "user_id",
        "sheet_id"
    )
VALUES (
        'arrosage carotte',
        '06/06/2023',
        '07/06/2023',
        1,
        1
    ), (
        'couper la haie',
        '04/11/2022',
        '10/11/2022',
        1,
        NULL
    );

INSERT INTO
    "add_favorite"("user_id", "sheet_id")
VALUES(1, 1), (1, 2);

COMMIT;