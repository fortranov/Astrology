from datetime import datetime

SIGN_DATA = [
    ((1, 20), "Козерог", "земля", "Собранность, амбиция и ориентация на долгий результат."),
    ((2, 19), "Водолей", "воздух", "Независимость, оригинальность мышления и тяга к свободе."),
    ((3, 21), "Рыбы", "вода", "Интуитивность, чувствительность и богатый внутренний мир."),
    ((4, 20), "Овен", "огонь", "Инициативность, энергия и стремление действовать быстро."),
    ((5, 21), "Телец", "земля", "Устойчивость, чувственность и любовь к надёжности."),
    ((6, 21), "Близнецы", "воздух", "Любознательность, общительность и гибкость мышления."),
    ((7, 23), "Рак", "вода", "Эмоциональная глубина, забота и сильная связь с близкими."),
    ((8, 23), "Лев", "огонь", "Яркость, творческая сила и потребность сиять."),
    ((9, 23), "Дева", "земля", "Внимание к деталям, практичность и стремление улучшать."),
    ((10, 23), "Весы", "воздух", "Дипломатичность, чувство гармонии и потребность в балансе."),
    ((11, 22), "Скорпион", "вода", "Интенсивность, внутренняя сила и стремление к трансформации."),
    ((12, 22), "Стрелец", "огонь", "Оптимизм, масштаб мышления и тяга к росту."),
    ((12, 32), "Козерог", "земля", "Собранность, амбиция и ориентация на долгий результат."),
]

RISING_SIGNS = [
    "Овен",
    "Телец",
    "Близнецы",
    "Рак",
    "Лев",
    "Дева",
    "Весы",
    "Скорпион",
    "Стрелец",
    "Козерог",
    "Водолей",
    "Рыбы",
]

MOON_SIGNS = [
    "Рыбы",
    "Овен",
    "Телец",
    "Близнецы",
    "Рак",
    "Лев",
    "Дева",
    "Весы",
    "Скорпион",
    "Стрелец",
    "Козерог",
    "Водолей",
]


def detect_sun_sign(birth_date: str) -> tuple[str, str, str]:
    date = datetime.strptime(birth_date, "%Y-%m-%d")
    month = date.month
    day = date.day

    sign = "Козерог"
    element = "земля"
    trait = "Собранность, амбиция и ориентация на долгий результат."

    for (end_month, end_day), current_sign, current_element, current_trait in SIGN_DATA:
        if (month, day) < (end_month, end_day):
            sign = current_sign
            element = current_element
            trait = current_trait
            break

    return sign, element, trait


def detect_moon_sign(birth_date: str) -> str:
    date = datetime.strptime(birth_date, "%Y-%m-%d")
    return MOON_SIGNS[date.day % len(MOON_SIGNS)]



def detect_rising_sign(birth_time: str | None, birth_place: str) -> str:
    if not birth_time:
        return "Весы"
    hour = int(birth_time.split(":")[0])
    index = (hour + len(birth_place)) % len(RISING_SIGNS)
    return RISING_SIGNS[index]



def build_natal_summary(name: str, birth_date: str, birth_place: str) -> tuple[str, str, str]:
    sign, _, trait = detect_sun_sign(birth_date)
    summary = f"{name}: базовый натальный портрет — знак Солнца {sign}."
    interpretation = (
        f"Для профиля {name}, рождённого в {birth_place}, MVP-интерпретация показывает знак Солнца {sign}. "
        f"Ключевой акцент: {trait} Это пока стартовая rule-based версия, которую позже можно расширить "
        f"домами, аспектами, асцендентом и AI-объяснениями простым языком."
    )
    return summary, sign, interpretation



def build_natal_details(name: str, birth_date: str, birth_time: str | None, birth_place: str) -> dict:
    sun_sign, element, trait = detect_sun_sign(birth_date)
    moon_sign = detect_moon_sign(birth_date)
    rising_sign = detect_rising_sign(birth_time, birth_place)

    strengths = [
        f"Сильная солнечная база знака {sun_sign}: {trait}",
        f"Лунный знак {moon_sign} добавляет эмоциональную глубину и внутреннюю мотивацию.",
        f"Асцендент в знаке {rising_sign} задаёт стиль самопрезентации и первое впечатление.",
    ]
    growth_zones = [
        "Учиться балансировать спонтанность и дисциплину.",
        "Не уходить в жёсткие сценарии, если интуиция подсказывает гибкость.",
        "Регулярно переводить внутренние инсайты в конкретные действия.",
    ]
    recommendations = [
        "Вести короткий дневник наблюдений за настроением и энергией.",
        "Планировать неделю по 1–2 главным приоритетам, а не по длинному списку.",
        "Возвращаться к этому разбору после появления домов, аспектов и полной карты.",
    ]

    love_reading = (
        f"В отношениях у профиля {name} заметна смесь {sun_sign.lower()}-стабильности и "
        f"эмоционального оттенка знака {moon_sign}. Это говорит о потребности одновременно в "
        f"надёжности, искренности и ощущении живого эмоционального контакта."
    )
    career_reading = (
        f"В карьере связка Солнца в знаке {sun_sign} и асцендента в знаке {rising_sign} показывает, "
        f"что лучше всего раскрываются сценарии, где есть личная ответственность, заметный вклад и "
        f"возможность постепенно усиливать экспертность."
    )
    purpose_reading = (
        f"Сейчас твой вектор предназначения в MVP-разборе читается через элемент «{element}»: "
        f"важно строить устойчивую систему из своих талантов, а не ждать единственного идеального момента."
    )

    return {
        "moon_sign": moon_sign,
        "rising_sign": rising_sign,
        "dominant_element": element,
        "strengths": strengths,
        "growth_zones": growth_zones,
        "love_reading": love_reading,
        "career_reading": career_reading,
        "purpose_reading": purpose_reading,
        "recommendations": recommendations,
    }
