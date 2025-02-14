const tg = window.Telegram.WebApp;
tg.expand();

// Добавляем в начало файла, после объявления tg
document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.querySelector('.splash-screen');
    const gameContainer = document.querySelector('.game-container');
    const startButton = document.querySelector('.start-game-btn');

    startButton.addEventListener('click', () => {
        splashScreen.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => {
            splashScreen.style.display = 'none';
            gameContainer.style.display = 'flex';
            renderScene(gameState.currentScene);
        }, 500);
    });
});

const gameState = {
    inventory: [],
    health: 100,
    currentScene: 'start'
};

const scenes = {
    start: {
        title: 'Начало пути',
        description: 'Мама попросила Красную Шапочку отнести пирожки бабушке. Путь предстоит неблизкий, через темный лес.',
        choices: [
            {
                text: 'Отправиться в путь',
                nextScene: 'forest_entrance'
            },
            {
                text: 'Проверить содержимое корзинки',
                nextScene: 'check_basket'
            }
        ]
    },
    check_basket: {
        title: 'Корзинка',
        description: 'В корзинке лежат свежие пирожки, бутылочка молока и маленький складной нож.',
        choices: [
            {
                text: 'Взять нож с собой',
                nextScene: 'take_knife'
            },
            {
                text: 'Оставить всё как есть',
                nextScene: 'forest_entrance'
            }
        ]
    },
    take_knife: {
        title: 'Складной нож',
        description: 'Вы решили взять нож с собой. Мало ли что может пригодиться в пути.',
        choices: [
            {
                text: 'Отправиться в путь',
                nextScene: 'forest_entrance'
            }
        ]
    },
    forest_entrance: {
        title: 'У входа в лес',
        description: 'Перед тобой темный лес. Тропинка разделяется на две: одна длиннее, но светлее, другая короче, но через чащу.',
        choices: [
            {
                text: 'Пойти длинной светлой дорогой',
                nextScene: 'light_path'
            },
            {
                text: 'Пойти короткой темной дорогой',
                nextScene: 'dark_path'
            }
        ]
    },
    light_path: {
        title: 'Светлая дорога',
        description: 'Вы идете по светлой дороге. Вдруг видите старушку, собирающую грибы.',
        choices: [
            {
                text: 'Подойти и поздороваться',
                nextScene: 'meet_old_lady'
            },
            {
                text: 'Пройти мимо',
                nextScene: 'continue_light_path'
            }
        ]
    },
    meet_old_lady: {
        title: 'Старушка',
        description: 'Старушка рассказывает, что видела волка, идущего в сторону домика бабушки.',
        choices: [
            {
                text: 'Поблагодарить и поспешить к бабушке',
                nextScene: 'hurry_to_grandma'
            },
            {
                text: 'Спросить короткий путь',
                nextScene: 'ask_shortcut'
            }
        ]
    },
    ask_shortcut: {
        title: 'Короткий путь',
        description: 'Старушка рассказывает о тайной тропинке через поляну с целебными травами.',
        choices: [
            {
                text: 'Пойти по тайной тропинке',
                nextScene: 'secret_path'
            },
            {
                text: 'Продолжить идти обычной дорогой',
                nextScene: 'continue_light_path'
            }
        ]
    },
    secret_path: {
        title: 'Тайная тропинка',
        description: 'На поляне растут удивительные травы. Старушка говорит, что они могут пригодиться для лечения.',
        choices: [
            {
                text: 'Собрать целебные травы',
                nextScene: 'gather_herbs'
            },
            {
                text: 'Поспешить к бабушке',
                nextScene: 'hurry_grandma'
            }
        ]
    },
    gather_herbs: {
        title: 'Сбор трав',
        description: 'Старушка учит вас различать целебные травы. Вы собираете букет из самых полезных растений.',
        choices: [
            {
                text: 'Расспросить о свойствах трав',
                nextScene: 'learn_herbs'
            },
            {
                text: 'Поблагодарить и идти дальше',
                nextScene: 'thank_and_go'
            }
        ]
    },
    learn_herbs: {
        title: 'Урок травничества',
        description: 'Вы узнаёте, что некоторые травы помогают от волчьих чар, а другие придают сил и храбрости.',
        choices: [
            {
                text: 'Взять травы от волчьих чар',
                nextScene: 'take_wolf_herbs'
            },
            {
                text: 'Взять травы для храбрости',
                nextScene: 'take_courage_herbs'
            }
        ]
    },
    take_wolf_herbs: {
        title: 'Защитные травы',
        description: 'Старушка дает вам особый амулет из трав, который может защитить от волка.',
        choices: [
            {
                text: 'Отправиться к бабушке',
                nextScene: 'protected_path'
            },
            {
                text: 'Поискать волка',
                nextScene: 'search_wolf_herbs'
            }
        ]
    },
    protected_path: {
        title: 'Защищенный путь',
        description: 'С амулетом вы чувствуете себя увереннее. Вдруг слышите волчий вой вдалеке.',
        choices: [
            {
                text: 'Использовать амулет',
                nextScene: 'use_amulet'
            },
            {
                text: 'Спрятаться и переждать',
                nextScene: 'hide_and_wait'
            }
        ]
    },
    dark_path: {
        title: 'Темная дорога',
        description: 'Вы идете по темной дороге. Внезапно слышите шорох в кустах.',
        choices: [
            {
                text: 'Затаиться',
                nextScene: 'hide_bush'
            },
            {
                text: 'Позвать: "Кто там?"',
                nextScene: 'meet_wolf'
            }
        ]
    },
    hide_bush: {
        title: 'В укрытии',
        description: 'Вы спрятались за деревом. Мимо пробегает серый волк, не заметив вас.',
        choices: [
            {
                text: 'Продолжить путь осторожно',
                nextScene: 'careful_path'
            },
            {
                text: 'Вернуться на развилку',
                nextScene: 'forest_entrance'
            }
        ]
    },
    meet_wolf: {
        title: 'Встреча с волком',
        description: 'Из кустов выходит большой серый волк. "Куда путь держишь, Красная Шапочка?"',
        choices: [
            {
                text: 'Сказать правду про бабушку',
                nextScene: 'tell_truth_wolf'
            },
            {
                text: 'Обмануть волка',
                nextScene: 'lie_to_wolf'
            }
        ]
    },
    tell_truth_wolf: {
        title: 'Разговор с волком',
        description: 'Волк хитро улыбается и предлагает наперегонки добраться до бабушкиного дома.',
        choices: [
            {
                text: 'Согласиться на соревнование',
                nextScene: 'race_with_wolf'
            },
            {
                text: 'Отказаться и пойти другой дорогой',
                nextScene: 'refuse_wolf'
            }
        ]
    },
    careful_path: {
        title: 'Осторожный путь',
        description: 'Вы осторожно продвигаетесь по тропинке. Вдалеке виднеется домик бабушки.',
        choices: [
            {
                text: 'Подойти к домику',
                nextScene: 'approach_house'
            },
            {
                text: 'Осмотреться вокруг',
                nextScene: 'look_around_house'
            }
        ]
    },
    approach_house: {
        title: 'У домика бабушки',
        description: 'Вы подходите к домику. Дверь приоткрыта, внутри тихо.',
        choices: [
            {
                text: 'Постучать и войти',
                nextScene: 'enter_house'
            },
            {
                text: 'Заглянуть в окно',
                nextScene: 'check_window'
            }
        ]
    },
    check_window: {
        title: 'У окна',
        description: 'В окно видно, что в кровати лежит кто-то очень большой, похожий на волка в бабушкином чепчике.',
        choices: [
            {
                text: 'Позвать на помощь',
                nextScene: 'call_help'
            },
            {
                text: 'Войти в дом',
                nextScene: 'enter_house_brave'
            }
        ]
    },
    call_help: {
        title: 'Зов о помощи',
        description: 'На ваш крик прибегают дровосеки. Они спасают бабушку и прогоняют волка.',
        choices: [
            {
                text: 'Обнять бабушку',
                nextScene: 'happy_ending'
            }
        ]
    },
    happy_ending: {
        title: 'Счастливый конец',
        description: 'Вы с бабушкой пьёте чай с пирожками. Волк больше никогда не появлялся в этих краях.',
        choices: [
            {
                text: 'Начать сначала',
                nextScene: 'start'
            }
        ]
    },
    lie_to_wolf: {
        title: 'Обман волка',
        description: 'Вы говорите волку, что идёте в деревню за хлебом. Волк не верит и принюхивается к корзинке.',
        choices: [
            {
                text: 'Убежать',
                nextScene: 'run_from_wolf'
            },
            {
                text: 'Показать корзинку',
                nextScene: 'show_basket_wolf'
            }
        ]
    },
    run_from_wolf: {
        title: 'Побег',
        description: 'Вы бросаетесь бежать. Волк преследует вас, но вы замечаете высокое дерево.',
        choices: [
            {
                text: 'Залезть на дерево',
                nextScene: 'climb_tree'
            },
            {
                text: 'Продолжать бежать',
                nextScene: 'continue_running'
            }
        ]
    },
    climb_tree: {
        title: 'На дереве',
        description: 'С высоты дерева вы видите домик бабушки и волка, бегущего к нему. Рядом работают дровосеки.',
        choices: [
            {
                text: 'Позвать дровосеков',
                nextScene: 'call_woodcutters'
            },
            {
                text: 'Слезть и пойти другой дорогой',
                nextScene: 'alternative_path'
            }
        ]
    },
    call_woodcutters: {
        title: 'Помощь дровосеков',
        description: 'Дровосеки услышали ваш крик и спешат на помощь. Они предлагают проводить вас к бабушке.',
        choices: [
            {
                text: 'Принять помощь',
                nextScene: 'woodcutters_escort'
            },
            {
                text: 'Отказаться и пойти одной',
                nextScene: 'go_alone'
            }
        ]
    },
    woodcutters_escort: {
        title: 'С дровосеками',
        description: 'Дровосеки рассказывают, что волк давно терроризирует окрестности. Они предлагают устроить ему ловушку.',
        choices: [
            {
                text: 'Помочь устроить ловушку',
                nextScene: 'set_trap'
            },
            {
                text: 'Продолжить путь к бабушке',
                nextScene: 'continue_to_grandma'
            }
        ]
    },
    set_trap: {
        title: 'Ловушка для волка',
        description: 'Вы помогаете дровосекам выкопать яму и замаскировать её. Теперь нужно заманить туда волка.',
        choices: [
            {
                text: 'Использовать пирожки как приманку',
                nextScene: 'use_pies_bait'
            },
            {
                text: 'Позвать волка',
                nextScene: 'call_wolf'
            }
        ]
    },
    use_pies_bait: {
        title: 'Приманка',
        description: 'Запах пирожков привлекает волка. Он приближается к ловушке, не подозревая об опасности.',
        choices: [
            {
                text: 'Подождать',
                nextScene: 'wait_wolf_trap'
            },
            {
                text: 'Спугнуть волка',
                nextScene: 'scare_wolf'
            }
        ]
    },
    wait_wolf_trap: {
        title: 'Волк в ловушке',
        description: 'План сработал! Волк попадает в яму. Дровосеки предлагают отвести его подальше в лес.',
        choices: [
            {
                text: 'Согласиться',
                nextScene: 'wolf_captured'
            },
            {
                text: 'Предложить отпустить волка',
                nextScene: 'release_wolf'
            }
        ]
    },
    wolf_captured: {
        title: 'Победа над волком',
        description: 'Дровосеки уводят волка далеко в лес. Теперь путь к бабушке безопасен.',
        choices: [
            {
                text: 'Пойти к бабушке',
                nextScene: 'safe_grandma_visit'
            }
        ]
    },
    safe_grandma_visit: {
        title: 'У бабушки',
        description: 'Вы благополучно добираетесь до бабушки. Она очень рада вас видеть и благодарит за пирожки.',
        choices: [
            {
                text: 'Рассказать о приключении',
                nextScene: 'tell_story'
            },
            {
                text: 'Начать чаепитие',
                nextScene: 'happy_ending'
            }
        ]
    },
    tell_story: {
        title: 'История о приключении',
        description: 'Бабушка внимательно слушает вашу историю о волке и дровосеках. Она гордится вашей храбростью.',
        choices: [
            {
                text: 'Отпраздновать за чаем',
                nextScene: 'happy_ending'
            },
            {
                text: 'Начать игру заново',
                nextScene: 'start'
            }
        ]
    },
    show_basket_wolf: {
        title: 'Корзинка для волка',
        description: 'Волк заглядывает в корзинку и облизывается, увидев пирожки.',
        choices: [
            {
                text: 'Предложить волку пирожок',
                nextScene: 'share_pie'
            },
            {
                text: 'Отдернуть корзинку',
                nextScene: 'protect_basket'
            }
        ]
    },
    share_pie: {
        title: 'Угощение волка',
        description: 'Волк с удовольствием съедает пирожок и становится более дружелюбным.',
        choices: [
            {
                text: 'Попросить проводить до бабушки',
                nextScene: 'friendly_wolf_escort'
            },
            {
                text: 'Попрощаться и уйти',
                nextScene: 'leave_wolf_happy'
            }
        ]
    },
    friendly_wolf_escort: {
        title: 'Дружелюбный волк',
        description: 'Волк соглашается проводить вас, но по пути рассказывает странные истории о бабушке.',
        choices: [
            {
                text: 'Расспросить подробнее',
                nextScene: 'wolf_stories'
            },
            {
                text: 'Держаться настороже',
                nextScene: 'cautious_journey'
            }
        ]
    },
    wolf_stories: {
        title: 'Истории волка',
        description: 'Волк рассказывает, что бабушка - известная в лесу целительница, и многие звери ходят к ней за помощью.',
        choices: [
            {
                text: 'Удивиться и расспросить ещё',
                nextScene: 'learn_about_grandma'
            },
            {
                text: 'Усомниться в словах волка',
                nextScene: 'doubt_wolf'
            }
        ]
    },
    learn_about_grandma: {
        title: 'Секреты бабушки',
        description: 'Оказывается, бабушка знает все травы в лесу и помогает не только людям, но и животным.',
        choices: [
            {
                text: 'Попросить научить вас травам',
                nextScene: 'herb_learning'
            },
            {
                text: 'Поспешить к бабушке',
                nextScene: 'hurry_to_grandma_herbs'
            }
        ]
    },
    herb_learning: {
        title: 'Лесные травы',
        description: 'Волк показывает вам разные целебные травы по пути. Вы начинаете понимать, почему бабушка живёт в лесу.',
        choices: [
            {
                text: 'Собрать немного трав',
                nextScene: 'collect_herbs'
            },
            {
                text: 'Продолжить путь',
                nextScene: 'continue_to_grandma'
            }
        ]
    },
    collect_herbs: {
        title: 'Сбор трав',
        description: 'Вы собираете целебные травы. Волк терпеливо ждёт и подсказывает, какие травы лучше взять.',
        choices: [
            {
                text: 'Поблагодарить волка',
                nextScene: 'thank_wolf_herbs'
            },
            {
                text: 'Предложить вместе навестить бабушку',
                nextScene: 'invite_wolf_grandma'
            }
        ]
    },
    invite_wolf_grandma: {
        title: 'Приглашение волка',
        description: 'Волк радостно соглашается, но предлагает сначала предупредить бабушку о визите.',
        choices: [
            {
                text: 'Согласиться предупредить',
                nextScene: 'warn_grandma'
            },
            {
                text: 'Сделать сюрприз',
                nextScene: 'surprise_visit'
            }
        ]
    },
    warn_grandma: {
        title: 'Предупреждение бабушки',
        description: 'Вы подходите к домику и громко зовёте бабушку, объясняя, что пришли с добрым волком.',
        choices: [
            {
                text: 'Подождать ответа',
                nextScene: 'grandma_response'
            },
            {
                text: 'Войти в дом',
                nextScene: 'enter_with_wolf'
            }
        ]
    },
    grandma_response: {
        title: 'Ответ бабушки',
        description: 'Бабушка выглядывает в окно и улыбается, узнав волка. Она приглашает всех на чай.',
        choices: [
            {
                text: 'Войти в дом',
                nextScene: 'peaceful_ending'
            },
            {
                text: 'Сначала показать собранные травы',
                nextScene: 'show_herbs_grandma'
            }
        ]
    },
    peaceful_ending: {
        title: 'Мирный конец',
        description: 'Вы все вместе пьёте чай с пирожками. Бабушка рассказывает о своём призвании помогать всем жителям леса.',
        choices: [
            {
                text: 'Попроситься в ученицы',
                nextScene: 'become_apprentice'
            },
            {
                text: 'Начать сначала',
                nextScene: 'start'
            }
        ]
    },
    become_apprentice: {
        title: 'Новая ученица',
        description: 'Бабушка с радостью соглашается обучать вас искусству целительства. Теперь вы будете часто навещать её вместе с вашим новым другом-волком.',
        choices: [
            {
                text: 'Начать новое приключение',
                nextScene: 'start'
            }
        ]
    },
    race_with_wolf: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    refuse_wolf: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    look_around_house: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    enter_house_brave: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    run_fast: {
        title: 'Быстрый бег',
        description: 'Вы бежите изо всех сил, перепрыгивая через поваленные деревья и камни.',
        choices: [
            {
                text: 'Срезать путь через поляну',
                nextScene: 'shortcut_meadow'
            },
            {
                text: 'Держать тропинки',
                nextScene: 'stay_on_path'
            }
        ]
    },
    shortcut_meadow: {
        title: 'Лесная поляна',
        description: 'На поляне вы встречаете охотника, который предупреждает об опасном волке в этих краях.',
        choices: [
            {
                text: 'Рассказать о гонке',
                nextScene: 'tell_hunter'
            },
            {
                text: 'Продолжить бежать',
                nextScene: 'continue_race'
            }
        ]
    },
    tell_hunter: {
        title: 'Разговор с охотником',
        description: 'Охотник, услышав о волке, решает проводить вас до бабушки.',
        choices: [
            {
                text: 'Принять помощь',
                nextScene: 'hunter_escort'
            },
            {
                text: 'Отказаться от помощи',
                nextScene: 'refuse_hunter'
            }
        ]
    },
    pick_flowers: {
        title: 'Сбор цветов',
        description: 'Вы не спешите и собираете красивые цветы. Вдруг слышите странный шум со стороны дома бабушки.',
        choices: [
            {
                text: 'Поспешить к дому',
                nextScene: 'hurry_noise'
            },
            {
                text: 'Позвать на помощь',
                nextScene: 'call_for_help'
            }
        ]
    },
    hurry_noise: {
        title: 'Спешка к дому',
        description: 'Подбегая к дому, вы замечаете открытую дверь и большие следы на пороге.',
        choices: [
            {
                text: 'Осторожно заглянуть в окно',
                nextScene: 'check_window'
            },
            {
                text: 'Громко позвать бабушку',
                nextScene: 'call_grandma_loud'
            }
        ]
    },
    call_grandma_loud: {
        title: 'Зов бабушки',
        description: 'На ваш крик из леса выбегают дровосеки, а из дома доносится рычание.',
        choices: [
            {
                text: 'Дождаться дровосеков',
                nextScene: 'wait_woodcutters'
            },
            {
                text: 'Войти в дом самостоятельно',
                nextScene: 'enter_alone'
            }
        ]
    },
    hunter_escort: {
        title: 'Помощь охотника',
        description: 'Охотник идёт с вами к дому бабушки. По пути он рассказывает о коварстве волка и его уловках.',
        choices: [
            {
                text: 'Расспросить о волке подробнее',
                nextScene: 'hunter_wolf_story'
            },
            {
                text: 'Ускорить шаг',
                nextScene: 'hurry_with_hunter'
            }
        ]
    },
    hunter_wolf_story: {
        title: 'История охотника',
        description: 'Охотник рассказывает, что волк уже пытался обмануть нескольких жителей деревни, но всегда был слишком хитёр, чтобы попасться.',
        choices: [
            {
                text: 'Предложить план поимки волка',
                nextScene: 'suggest_trap_plan'
            },
            {
                text: 'Продолжить путь молча',
                nextScene: 'silent_walk'
            }
        ]
    },
    suggest_trap_plan: {
        title: 'План поимки',
        description: 'Вы предлагаете использовать пирожки как приманку и устроить засаду у дома бабушки.',
        choices: [
            {
                text: 'Разработать детали плана',
                nextScene: 'plan_details'
            },
            {
                text: 'Сначала проверить бабушку',
                nextScene: 'check_grandma_first'
            }
        ]
    },
    plan_details: {
        title: 'Детали плана',
        description: 'Охотник одобряет план и предлагает позвать на помощь дровосеков, работающих неподалёку.',
        choices: [
            {
                text: 'Позвать дровосеков',
                nextScene: 'call_woodcutters'
            },
            {
                text: 'Справиться вдвоём',
                nextScene: 'duo_plan'
            }
        ]
    },
    call_woodcutters: {
        title: 'Помощь дровосеков',
        description: 'Дровосеки с радостью соглашаются помочь. Теперь вас целая команда.',
        choices: [
            {
                text: 'Окружить дом бабушки',
                nextScene: 'surround_house'
            },
            {
                text: 'Устроить засаду в лесу',
                nextScene: 'forest_ambush'
            }
        ]
    },
    surround_house: {
        title: 'Окружение дома',
        description: 'Вы и помощники занимаете позиции вокруг дома бабушки. Вскоре замечаете приближающегося волка.',
        choices: [
            {
                text: 'Дать волку войти в дом',
                nextScene: 'let_wolf_enter'
            },
            {
                text: 'Поймать волка сейчас',
                nextScene: 'catch_wolf_outside'
            }
        ]
    },
    catch_wolf_outside: {
        title: 'Поимка волка',
        description: 'Общими усилиями вам удаётся поймать волка. Он обещает больше никогда не вредить жителям леса.',
        choices: [
            {
                text: 'Отпустить волка',
                nextScene: 'release_wolf'
            },
            {
                text: 'Отвести его к леснику',
                nextScene: 'take_to_forester'
            }
        ]
    },
    use_knife: {
        title: 'Использование ножа',
        description: 'Вы достаёте складной нож. Волк настороженно следит за вашими движениями.',
        choices: [
            {
                text: 'Напасть на волка',
                nextScene: 'attack_wolf_knife'
            },
            {
                text: 'Угрожать ножом',
                nextScene: 'threaten_wolf'
            }
        ]
    },
    attack_wolf_knife: {
        title: 'Схватка с волком',
        description: 'В отчаянной схватке вам удаётся ранить волка, но он успевает нанести смертельные раны и вам.',
        choices: [
            {
                text: 'Трагический конец',
                nextScene: 'both_die'
            }
        ]
    },
    both_die: {
        title: 'Трагический финал',
        description: 'Дровосеки находят тела волка и Красной Шапочки. Никто не вышел победителем из этой схватки.',
        choices: [
            {
                text: 'Начать сначала',
                nextScene: 'start'
            }
        ]
    },
    enter_alone: {
        title: 'Роковое решение',
        description: 'Войдя в дом, вы видите волка, который уже расправился с бабушкой. У вас нет шансов спастись.',
        choices: [
            {
                text: 'Трагический конец',
                nextScene: 'all_die'
            }
        ]
    },
    all_die: {
        title: 'Печальный финал',
        description: 'Волк оказался слишком силён. Ни Красная Шапочка, ни бабушка не выжили в этой истории.',
        choices: [
            {
                text: 'Начать сначала',
                nextScene: 'start'
            }
        ]
    },
    hunter_sacrifice: {
        title: 'Жертва охотника',
        description: 'Охотник закрывает вас собой от волка, но зверь оказывается слишком силён. Погибают все.',
        choices: [
            {
                text: 'Трагический конец',
                nextScene: 'everyone_dies'
            }
        ]
    },
    wolf_victory: {
        title: 'Победа волка',
        description: 'Волк оказался хитрее и сильнее. Красная Шапочка больше никогда не вернулась из леса.',
        choices: [
            {
                text: 'Начать сначала',
                nextScene: 'start'
            }
        ]
    },
    kill_wolf: {
        title: 'Конец волка',
        description: 'Общими усилиями волка удаётся одолеть, но цена оказалась слишком высока - многие погибли.',
        choices: [
            {
                text: 'Почтить память павших',
                nextScene: 'memorial_ending'
            }
        ]
    },
    memorial_ending: {
        title: 'Памятная концовка',
        description: 'В лесу установили памятник погибшим. Больше никто не ходит этой дорогой к дому бабушки.',
        choices: [
            {
                text: 'Начать сначала',
                nextScene: 'start'
            }
        ]
    },
    stay_on_path: {
        title: 'На тропинке',
        description: 'Вы бежите по знакомой тропинке. Вдалеке слышится треск веток - похоже, волк пробирается через чащу.',
        choices: [
            {
                text: 'Ускориться',
                nextScene: 'speed_up_path'
            },
            {
                text: 'Затаиться и подождать',
                nextScene: 'hide_and_observe'
            }
        ]
    },
    speed_up_path: {
        title: 'Ускорение',
        description: 'Вы бежите изо всех сил. Внезапно видите, как волк выскакивает из чащи прямо перед вами!',
        choices: [
            {
                text: 'Использовать нож',
                nextScene: 'use_knife_race'
            },
            {
                text: 'Отпрыгнуть в сторону',
                nextScene: 'dodge_wolf'
            }
        ]
    },
    use_knife_race: {
        title: 'Защита ножом',
        description: 'Вы выхватываете нож, но волк оказывается быстрее. В последний момент он замечает лезвие и отскакивает.',
        choices: [
            {
                text: 'Угрожать волку',
                nextScene: 'threaten_wolf_knife'
            },
            {
                text: 'Броситься бежать',
                nextScene: 'run_after_threat'
            }
        ]
    },
    dodge_wolf: {
        title: 'Уклонение',
        description: 'Вы едва успеваете отпрыгнуть. Волк промахивается и врезается в дерево, теряя сознание.',
        choices: [
            {
                text: 'Добить волка',
                nextScene: 'finish_wolf'
            },
            {
                text: 'Убежать к бабушке',
                nextScene: 'escape_to_grandma'
            }
        ]
    },
    finish_wolf: {
        title: 'Роковое решение',
        description: 'Вы решаетесь покончить с волком, но в последний момент он приходит в себя. Завязывается смертельная схватка.',
        choices: [
            {
                text: 'Сражаться до конца',
                nextScene: 'both_die'
            }
        ]
    },
    escape_to_grandma: {
        title: 'Побег',
        description: 'Вы бежите к дому бабушки, пока волк без сознания. Но успеете ли предупредить её вовремя?',
        choices: [
            {
                text: 'Кричать и звать на помощь',
                nextScene: 'call_help_running'
            },
            {
                text: 'Бежать молча',
                nextScene: 'silent_run'
            }
        ]
    },
    pull_basket: {
        title: 'Борьба за корзинку',
        description: 'Вы резко отдёргиваете корзинку, и волк теряет равновесие. Пирожки рассыпаются по земле.',
        choices: [
            {
                text: 'Использовать момент для побега',
                nextScene: 'escape_moment'
            },
            {
                text: 'Достать нож',
                nextScene: 'use_knife_basket'
            }
        ]
    },
    escape_moment: {
        title: 'Момент для побега',
        description: 'Пока волк отвлёкся на рассыпанные пирожки, у вас есть шанс убежать.',
        choices: [
            {
                text: 'Бежать к дому бабушки',
                nextScene: 'run_to_grandma_basket'
            },
            {
                text: 'Бежать обратно в деревню',
                nextScene: 'run_to_village'
            }
        ]
    },
    use_knife_basket: {
        title: 'Защита ножом',
        description: 'Вы достаёте нож. Волк замечает лезвие и отступает, рыча.',
        choices: [
            {
                text: 'Угрожать волку',
                nextScene: 'threaten_wolf_basket'
            },
            {
                text: 'Атаковать',
                nextScene: 'attack_wolf_basket'
            }
        ]
    },
    threaten_wolf_basket: {
        title: 'Угроза волку',
        description: 'Волк медленно отступает, но вы видите в его глазах, что он не намерен так просто сдаваться.',
        choices: [
            {
                text: 'Продолжать угрожать',
                nextScene: 'continue_threat'
            },
            {
                text: 'Позвать на помощь',
                nextScene: 'call_help_basket'
            }
        ]
    },
    continue_threat: {
        title: 'Противостояние',
        description: 'Волк внезапно бросается на вас, несмотря на нож. Завязывается смертельная схватка.',
        choices: [
            {
                text: 'Сражаться до конца',
                nextScene: 'final_battle'
            }
        ]
    },
    final_battle: {
        title: 'Последняя схватка',
        description: 'В отчаянной борьбе вам удаётся ранить волка, но и он успевает нанести вам смертельные раны.',
        choices: [
            {
                text: 'Принять судьбу',
                nextScene: 'both_die'
            }
        ]
    },
    call_help_basket: {
        title: 'Зов о помощи',
        description: 'На ваш крик прибегают дровосеки. Увидев людей, волк убегает в лес.',
        choices: [
            {
                text: 'Поблагодарить дровосеков',
                nextScene: 'thank_woodcutters'
            },
            {
                text: 'Попросить проводить до бабушки',
                nextScene: 'ask_escort'
            }
        ]
    },
    threaten_wolf_knife: {
        title: 'Угрозы ножом',
        description: 'Волк отступает, но его глаза горят яростью. Он начинает кружить вокруг вас.',
        choices: [
            {
                text: 'Держать оборону',
                nextScene: 'hold_defense'
            },
            {
                text: 'Атаковать первым',
                nextScene: 'attack_first'
            }
        ]
    },
    hold_defense: {
        title: 'Оборона',
        description: 'Волк ищет слабое место в вашей защите. Внезапно сзади слышится хруст веток.',
        choices: [
            {
                text: 'Обернуться',
                nextScene: 'turn_around_trap'
            },
            {
                text: 'Не поддаваться на уловку',
                nextScene: 'stay_focused'
            }
        ]
    },
    turn_around_trap: {
        title: 'Роковая ошибка',
        description: 'Обернувшись, вы понимаете, что это была уловка. Волк нападает сзади.',
        choices: [
            {
                text: 'Принять судьбу',
                nextScene: 'wolf_victory'
            }
        ]
    },
    stay_focused: {
        title: 'Сохранение бдительности',
        description: 'Вы не поддались на уловку. Волк, видя вашу стойкость, начинает отступать в лес.',
        choices: [
            {
                text: 'Преследовать волка',
                nextScene: 'chase_wolf'
            },
            {
                text: 'Дать уйти',
                nextScene: 'let_wolf_go'
            }
        ]
    },
    attack_first: {
        title: 'Внезапная атака',
        description: 'Вы бросаетесь на волка с ножом, но он ожидал этого. Завязывается смертельная схватка.',
        choices: [
            {
                text: 'Сражаться до конца',
                nextScene: 'final_battle'
            }
        ]
    },
    chase_wolf: {
        title: 'Погоня',
        description: 'Преследуя волка, вы забегаете глубоко в лес и теряете его след. Теперь вы сами в опасности.',
        choices: [
            {
                text: 'Попытаться найти дорогу',
                nextScene: 'lost_in_forest'
            },
            {
                text: 'Звать на помощь',
                nextScene: 'call_help_lost'
            }
        ]
    },
    let_wolf_go: {
        title: 'Мудрое решение',
        description: 'Вы позволяете волку уйти. Теперь нужно спешить к бабушке, пока он не придумал новый план.',
        choices: [
            {
                text: 'Бежать к бабушке',
                nextScene: 'rush_to_grandma'
            },
            {
                text: 'Искать помощь',
                nextScene: 'seek_help'
            }
        ]
    },
    rush_to_grandma: {
        title: 'Спешка к бабушке',
        description: 'Вы бежите к домику бабушки. Вдалеке уже виден дымок из трубы.',
        choices: [
            {
                text: 'Проверить окно',
                nextScene: 'check_window'
            },
            {
                text: 'Сразу войти',
                nextScene: 'enter_directly'
            }
        ]
    },
    seek_help: {
        title: 'Поиск помощи',
        description: 'Вы решаете найти помощь. Неподалёку слышны звуки работающих дровосеков.',
        choices: [
            {
                text: 'Позвать дровосеков',
                nextScene: 'call_woodcutters_help'
            },
            {
                text: 'Вернуться в деревню',
                nextScene: 'return_to_village'
            }
        ]
    },
    call_woodcutters_help: {
        title: 'Помощь дровосеков',
        description: 'Дровосеки соглашаются помочь. Вместе вы идёте к домику бабушки.',
        choices: [
            {
                text: 'Войти с дровосеками',
                nextScene: 'enter_with_woodcutters'
            },
            {
                text: 'Подождать снаружи',
                nextScene: 'wait_outside'
            }
        ]
    },
    enter_with_woodcutters: {
        title: 'Вход с подмогой',
        description: 'Вы входите в дом вместе с дровосеками. Если волк и был здесь, он успел убежать.',
        choices: [
            {
                text: 'Обнять бабушку',
                nextScene: 'happy_ending'
            }
        ]
    },
    wait_outside: {
        title: 'Ожидание',
        description: 'Дровосеки проверяют дом. Бабушка в безопасности, а волка нигде нет.',
        choices: [
            {
                text: 'Войти в дом',
                nextScene: 'safe_entry'
            }
        ]
    },
    safe_entry: {
        title: 'Безопасный вход',
        description: 'Вы входите в дом, где вас ждёт улыбающаяся бабушка. Дровосеки обещают охранять окрестности.',
        choices: [
            {
                text: 'Отпраздновать чаем',
                nextScene: 'tea_celebration'
            }
        ]
    },
    tea_celebration: {
        title: 'Чаепитие',
        description: 'Вы все вместе пьёте чай с пирожками, радуясь благополучному исходу.',
        choices: [
            {
                text: 'Начать сначала',
                nextScene: 'start'
            }
        ]
    },
    enter_directly: {
        title: 'В доме бабушки',
        description: 'Войдя в дом, вы видите бабушку, лежащую в постели. Что-то в её внешности кажется странным.',
        choices: [
            {
                text: 'Подойти ближе',
                nextScene: 'approach_grandma'
            },
            {
                text: 'Остаться у двери',
                nextScene: 'stay_at_door'
            }
        ]
    },
    approach_grandma: {
        title: 'Странная бабушка',
        description: 'Подойдя ближе, вы замечаете, что у бабушки слишком большие уши и глаза. И зубы... очень большие зубы!',
        choices: [
            {
                text: 'Спросить про глаза',
                nextScene: 'ask_about_eyes'
            },
            {
                text: 'Попытаться убежать',
                nextScene: 'try_escape_bed'
            }
        ]
    },
    ask_about_eyes: {
        title: 'Роковые вопросы',
        description: '"Бабушка, а почему у тебя такие большие глаза?" - "Чтобы лучше видеть тебя!" - отвечает волк, сбрасывая одеяло.',
        choices: [
            {
                text: 'Использовать нож',
                nextScene: 'use_knife_bed'
            },
            {
                text: 'Звать на помощь',
                nextScene: 'scream_for_help'
            }
        ]
    },
    scream_for_help: {
        title: 'Крик о помощи',
        description: 'Ваш крик слышат дровосеки, работающие неподалёку. Они врываются в дом с топорами наготове.',
        choices: [
            {
                text: 'Отойти в сторону',
                nextScene: 'woodcutters_save'
            }
        ]
    },
    woodcutters_save: {
        title: 'Спасение',
        description: 'Дровосеки прогоняют волка. В чулане вы находите связанную, но живую бабушку.',
        choices: [
            {
                text: 'Освободить бабушку',
                nextScene: 'rescue_grandma'
            }
        ]
    },
    rescue_grandma: {
        title: 'Воссоединение',
        description: 'Бабушка освобождена и очень рада вас видеть. Она благодарит всех за спасение.',
        choices: [
            {
                text: 'Устроить праздничное чаепитие',
                nextScene: 'celebration_tea'
            }
        ]
    },
    celebration_tea: {
        title: 'Счастливый конец',
        description: 'Все вместе вы пьёте чай с пирожками. Дровосеки обещают защищать лес от волка.',
        choices: [
            {
                text: 'Начать сначала',
                nextScene: 'start'
            }
        ]
    },
    use_knife_bed: {
        title: 'Отчаянная защита',
        description: 'Вы выхватываете нож. Волк на мгновение останавливается, оценивая опасность.',
        choices: [
            {
                text: 'Атаковать волка',
                nextScene: 'attack_wolf_bed'
            },
            {
                text: 'Медленно отступать к двери',
                nextScene: 'retreat_to_door'
            }
        ]
    },
    attack_wolf_bed: {
        title: 'Схватка в доме',
        description: 'Вы бросаетесь на волка с ножом. Он уворачивается, но вы успеваете его ранить.',
        choices: [
            {
                text: 'Продолжить атаку',
                nextScene: 'continue_attack'
            },
            {
                text: 'Выбежать из дома',
                nextScene: 'run_from_house'
            }
        ]
    },
    continue_attack: {
        title: 'Решающий момент',
        description: 'Раненый волк становится ещё опаснее. В этот момент слышится стук в дверь - это дровосеки!',
        choices: [
            {
                text: 'Крикнуть дровосекам',
                nextScene: 'call_woodcutters_fight'
            },
            {
                text: 'Нанести решающий удар',
                nextScene: 'final_strike'
            }
        ]
    },
    call_woodcutters_fight: {
        title: 'Помощь пришла',
        description: 'Дровосеки врываются в дом. Волк, понимая, что окружён, выпрыгивает в окно.',
        choices: [
            {
                text: 'Искать бабушку',
                nextScene: 'search_grandma'
            }
        ]
    },
    search_grandma: {
        title: 'Поиски бабушки',
        description: 'В чулане вы находите связанную бабушку. К счастью, она не пострадала.',
        choices: [
            {
                text: 'Освободить бабушку',
                nextScene: 'rescue_grandma'
            }
        ]
    },
    hurry_to_grandma: {
        title: 'Спешка к бабушке',
        description: 'Вы спешите предупредить бабушку. Вдруг слышите треск веток в кустах.',
        choices: [
            {
                text: 'Спрятаться за дерево',
                nextScene: 'hide_behind_tree'
            },
            {
                text: 'Продолжить бежать',
                nextScene: 'continue_running'
            }
        ]
    },
    hide_behind_tree: {
        title: 'За деревом',
        description: 'Из кустов выходит волк. Он принюхивается, пытаясь уловить ваш запах.',
        choices: [
            {
                text: 'Затаить дыхание',
                nextScene: 'hold_breath'
            },
            {
                text: 'Достать нож',
                nextScene: 'prepare_knife'
            }
        ]
    },
    hold_breath: {
        title: 'Затаившись',
        description: 'Волк проходит мимо, не заметив вас. Он направляется в сторону дома бабушки.',
        choices: [
            {
                text: 'Тихо следовать за ним',
                nextScene: 'follow_wolf'
            },
            {
                text: 'Побежать другой дорогой',
                nextScene: 'alternative_path'
            }
        ]
    },
    follow_wolf: {
        title: 'Слежка',
        description: 'Вы осторожно следуете за волком. Он явно знает короткий путь к дому бабушки.',
        choices: [
            {
                text: 'Попытаться обогнать его',
                nextScene: 'try_overtake'
            },
            {
                text: 'Искать дровосеков',
                nextScene: 'seek_woodcutters'
            }
        ]
    },
    seek_woodcutters: {
        title: 'Поиск помощи',
        description: 'Вы слышите стук топоров неподалёку. Дровосеки могут помочь!',
        choices: [
            {
                text: 'Позвать дровосеков',
                nextScene: 'call_woodcutters'
            },
            {
                text: 'Продолжить следить за волком',
                nextScene: 'continue_following'
            }
        ]
    },
    prepare_knife: {
        title: 'Подготовка к защите',
        description: 'Вы крепко сжимаете нож в руке. Волк замечает блеск лезвия и начинает кружить вокруг.',
        choices: [
            {
                text: 'Угрожающе махнуть ножом',
                nextScene: 'threaten_with_knife'
            },
            {
                text: 'Ждать его действий',
                nextScene: 'wait_wolf_move'
            }
        ]
    },
    threaten_with_knife: {
        title: 'Угроза оружием',
        description: 'Волк отступает на шаг, но в его глазах читается хитрость. Он ищет слабое место в вашей обороне.',
        choices: [
            {
                text: 'Броситься вперёд',
                nextScene: 'charge_forward'
            },
            {
                text: 'Медленно отступать',
                nextScene: 'slow_retreat'
            }
        ]
    },
    charge_forward: {
        title: 'Атака',
        description: 'Вы делаете выпад. Волк не ожидал такой смелости и отскакивает в сторону, получив царапину.',
        choices: [
            {
                text: 'Преследовать волка',
                nextScene: 'chase_wolf'
            },
            {
                text: 'Воспользоваться моментом для побега',
                nextScene: 'escape_moment_knife'
            }
        ]
    },
    escape_moment_knife: {
        title: 'Момент для побега',
        description: 'Пока волк зализывает рану, у вас есть шанс убежать. Вдалеке слышны голоса дровосеков.',
        choices: [
            {
                text: 'Бежать к дровосекам',
                nextScene: 'run_to_woodcutters'
            },
            {
                text: 'Бежать к дому бабушки',
                nextScene: 'rush_to_grandma_knife'
            }
        ]
    },
    run_to_woodcutters: {
        title: 'К дровосекам',
        description: 'Дровосеки замечают вас и спешат навстречу. Волк, видя людей с топорами, скрывается в лесу.',
        choices: [
            {
                text: 'Рассказать о волке',
                nextScene: 'tell_about_wolf'
            },
            {
                text: 'Просить проводить к бабушке',
                nextScene: 'ask_escort_knife'
            }
        ]
    },
    tell_about_wolf: {
        title: 'История о волке',
        description: 'Вы рассказываете дровосекам о волке и его намерениях.',
        choices: [
            {
                text: 'Продолжить путь',
                nextScene: 'continue_to_grandma'
            },
            {
                text: 'Позвать на помощь',
                nextScene: 'call_help_wolf'
            }
        ]
    },
    ask_escort_knife: {
        title: 'Помощь дровосеков',
        description: 'Дровосеки соглашаются помочь. Вместе вы идёте к домику бабушки.',
        choices: [
            {
                text: 'Войти с дровосеками',
                nextScene: 'enter_with_woodcutters'
            },
            {
                text: 'Подождать снаружи',
                nextScene: 'wait_outside'
            }
        ]
    },
    call_help_wolf: {
        title: 'Зов о помощи',
        description: 'Дровосеки соглашаются помочь. Вместе вы идёте к домику бабушки.',
        choices: [
            {
                text: 'Войти с дровосеками',
                nextScene: 'enter_with_woodcutters'
            },
            {
                text: 'Подождать снаружи',
                nextScene: 'wait_outside'
            }
        ]
    },
    rush_to_grandma_knife: {
        title: 'Спешка к бабушке',
        description: 'Вы бежите к домику бабушки. Вдалеке уже виден дымок из трубы.',
        choices: [
            {
                text: 'Проверить окно',
                nextScene: 'check_window'
            },
            {
                text: 'Сразу войти',
                nextScene: 'enter_directly'
            }
        ]
    },
    wait_wolf_move: {
        title: 'Ожидание',
        description: 'Волк делает обманный выпад, но вы не поддаетесь. В этот момент слышится стук топоров.',
        choices: [
            {
                text: 'Позвать на помощь',
                nextScene: 'call_help_knife'
            },
            {
                text: 'Атаковать волка',
                nextScene: 'attack_wolf_final'
            }
        ]
    },
    attack_wolf_final: {
        title: 'Решительный момент',
        description: 'Ваша атака застаёт волка врасплох. Раненый, он убегает в лес.',
        choices: [
            {
                text: 'Бежать к бабушке',
                nextScene: 'final_grandma_rush'
            }
        ]
    },
    final_grandma_rush: {
        title: 'Последний рывок',
        description: 'Вы добегаете до дома бабушки. К счастью, волк не успел добраться сюда первым.',
        choices: [
            {
                text: 'Обнять бабушку',
                nextScene: 'happy_ending'
            }
        ]
    },
    continue_light_path: {
        title: 'Продолжение пути',
        description: 'Пройдя мимо старушки, вы слышите странный вой в лесу.',
        choices: [
            {
                text: 'Ускорить шаг',
                nextScene: 'quicken_pace'
            },
            {
                text: 'Осмотреться вокруг',
                nextScene: 'look_around_path'
            }
        ]
    },
    look_around_path: {
        title: 'Осмотр окрестностей',
        description: 'Среди деревьев вы замечаете серый силуэт, следящий за вами.',
        choices: [
            {
                text: 'Достать нож',
                nextScene: 'prepare_knife_path'
            },
            {
                text: 'Притвориться, что не заметили',
                nextScene: 'pretend_unaware'
            }
        ]
    },
    pretend_unaware: {
        title: 'Хитрый план',
        description: 'Вы продолжаете идти, делая вид, что ничего не замечаете. Волк выходит на тропинку позади вас.',
        choices: [
            {
                text: 'Резко обернуться',
                nextScene: 'sudden_turn'
            },
            {
                text: 'Продолжать притворяться',
                nextScene: 'keep_pretending'
            }
        ]
    },
    sudden_turn: {
        title: 'Неожиданный поворот',
        description: 'Волк удивлён вашей реакцией. Он останавливается, оценивая ситуацию.',
        choices: [
            {
                text: 'Попытаться договориться',
                nextScene: 'negotiate_wolf_path'
            },
            {
                text: 'Угрожающе шагнуть вперёд',
                nextScene: 'threaten_step'
            }
        ]
    },
    negotiate_wolf_path: {
        title: 'Переговоры с волком',
        description: 'Вы предлагаете волку пирожок в обмен на безопасный проход. Он заинтересованно принюхивается.',
        choices: [
            {
                text: 'Бросить пирожок в сторону',
                nextScene: 'throw_pie'
            },
            {
                text: 'Положить пирожок на землю',
                nextScene: 'place_pie'
            }
        ]
    },
    throw_pie: {
        title: 'Отвлекающий манёвр',
        description: 'Пока волк бросается за пирожком, вы замечаете дым из трубы домика бабушки.',
        choices: [
            {
                text: 'Бежать к домику',
                nextScene: 'run_to_house'
            },
            {
                text: 'Подождать реакции волка',
                nextScene: 'wait_wolf_reaction'
            }
        ]
    },
    run_to_house: {
        title: 'Спринт к бабушке',
        description: 'Вы бежите к домику. Сзади слышится рычание - волк понял ваш план!',
        choices: [
            {
                text: 'Звать на помощь',
                nextScene: 'call_help_run'
            },
            {
                text: 'Бежать ещё быстрее',
                nextScene: 'sprint_faster'
            }
        ]
    },
    call_help_run: {
        title: 'Зов о помощи',
        description: 'На ваш крик откликаются дровосеки. Волк останавливается и скрывается в лесу.',
        choices: [
            {
                text: 'Поблагодарить дровосеков',
                nextScene: 'thank_woodcutters_path'
            }
        ]
    },
    thank_woodcutters_path: {
        title: 'Благодарность спасителям',
        description: 'Дровосеки провожают вас до самого домика бабушки.',
        choices: [
            {
                text: 'Войти в дом',
                nextScene: 'safe_ending'
            }
        ]
    },
    safe_ending: {
        title: 'Благополучное завершение',
        description: 'Бабушка встречает вас с улыбкой. Вы рассказываете о приключении за чашкой чая.',
        choices: [
            {
                text: 'Начать сначала',
                nextScene: 'start'
            }
        ]
    },
    quicken_pace: {
        title: 'В следующих сериях...',
        description: 'Продолжение этой истории появится в следующем обновлении квеста!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    prepare_knife_path: {
        title: 'В следующих сериях...',
        description: 'Продолжение этой истории появится в следующем обновлении квеста!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    keep_pretending: {
        title: 'В следующих сериях...',
        description: 'Продолжение этой истории появится в следующем обновлении квеста!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    threaten_step: {
        title: 'В следующих сериях...',
        description: 'Продолжение этой истории появится в следующем обновлении квеста!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    place_pie: {
        title: 'В следующих сериях...',
        description: 'Продолжение этой истории появится в следующем обновлении квеста!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    wait_wolf_reaction: {
        title: 'В следующих сериях...',
        description: 'Продолжение этой истории появится в следующем обновлении квеста!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    sprint_faster: {
        title: 'В следующих сериях...',
        description: 'Продолжение этой истории появится в следующем обновлении квеста!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    take_courage_herbs: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    search_wolf_herbs: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    use_amulet: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    hide_and_wait: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    race_with_wolf: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    refuse_wolf: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    look_around_house: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    enter_house_brave: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    continue_running: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    alternative_path: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    try_overtake: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    continue_following: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    slow_retreat: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    stay_at_door: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    try_escape_bed: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    retreat_to_door: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    run_from_house: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    final_strike: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },
    // ... существующий код ...

    lie_to_wolf: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },

    call_help: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },

    both_die: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },

    wolf_victory: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },

    return_to_village: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },

    lost_in_forest: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },

    call_help_lost: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    },

    rush_to_grandma_knife: {
        title: 'Продолжение следует...',
        description: 'Эта часть истории ещё пишется. Следите за обновлениями!',
        choices: [
            {
                text: 'Вернуться в начало',
                nextScene: 'start'
            }
        ]
    }
};

function renderScene(sceneId) {
    const scene = scenes[sceneId];
    const sceneElement = document.querySelector('.scene');
    const sceneTitle = document.querySelector('.scene-title');
    const sceneDescription = document.querySelector('.scene-description');
    const choicesContainer = document.querySelector('.choices-container');

    // Добавляем анимацию исчезновения
    sceneElement.style.opacity = '0';
    sceneElement.style.transform = 'translateY(20px)';

    setTimeout(() => {
        sceneTitle.textContent = scene.title;
        sceneDescription.textContent = scene.description;
        choicesContainer.innerHTML = '';

        scene.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.textContent = choice.text;
            button.style.opacity = '0';
            button.style.animation = `bounceIn 0.5s ease-out ${index * 0.1}s forwards`;
            
            button.addEventListener('click', () => {
                // Анимация при клике
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 100);

                setTimeout(() => {
                    gameState.currentScene = choice.nextScene;
                    renderScene(choice.nextScene);
                }, 300);
            });
            
            choicesContainer.appendChild(button);
        });

        // Анимация появления
        sceneElement.style.opacity = '1';
        sceneElement.style.transform = 'translateY(0)';
    }, 300);
}

// Добавляем плавные переходы
document.documentElement.style.setProperty('--transition-speed', '0.3s');

// Инициализация игры
renderScene(gameState.currentScene);