// ========== КОНФИГУРАЦИЯ ТЕСТОВ ==========
const AVAILABLE_TESTS = ['b211', 'b26-marine', 'b28'];

const TEST_CONFIGS = {
    a1: {
        code: 'А.1',
        name: 'Основы промышленной безопасности',
        fullName: 'А.1 Основы промышленной безопасности',
        jsonFile: 'questions_a1.json',
        totalQuestions: 211,
        blocks: [
            { num: 1, start: 0, end: 53, desc: 'Вопросы 1 - 53' },
            { num: 2, start: 53, end: 106, desc: 'Вопросы 54 - 106' },
            { num: 3, start: 106, end: 159, desc: 'Вопросы 107 - 159' },
            { num: 4, start: 159, end: 211, desc: 'Вопросы 160 - 211' }
        ]
    },
    b21: {
        code: 'Б.2.1',
        name: 'Эксплуатация объектов нефтяной и газовой промышленности',
        fullName: 'Б.2.1 Эксплуатация объектов нефтяной и газовой промышленности',
        jsonFile: 'questions_b21.json',
        totalQuestions: 405,
        blocks: [
            { num: 1, start: 0, end: 68, desc: 'Вопросы 1 - 68' },
            { num: 2, start: 68, end: 136, desc: 'Вопросы 69 - 136' },
            { num: 3, start: 136, end: 204, desc: 'Вопросы 137 - 204' },
            { num: 4, start: 204, end: 272, desc: 'Вопросы 205 - 272' },
            { num: 5, start: 272, end: 340, desc: 'Вопросы 273 - 340' },
            { num: 6, start: 340, end: 405, desc: 'Вопросы 341 - 405' }
        ]
    },
    b23: {
        code: 'Б.2.3',
        name: 'Проектирование, строительство, реконструкция',
        fullName: 'Б.2.3 Проектирование, строительство, реконструкция и капитальный ремонт',
        jsonFile: 'questions_b23.json',
        totalQuestions: 228,
        blocks: [
            { num: 1, start: 0, end: 57, desc: 'Вопросы 1 - 57' },
            { num: 2, start: 57, end: 114, desc: 'Вопросы 58 - 114' },
            { num: 3, start: 114, end: 171, desc: 'Вопросы 115 - 171' },
            { num: 4, start: 171, end: 228, desc: 'Вопросы 172 - 228' }
        ]
    },
    'b26-marine': {
        code: 'Б.2.6',
        name: 'Разведка и разработка морских месторождений',
        fullName: 'Б.2.6 Разведка и разработка морских месторождений углеводородного сырья',
        jsonFile: 'questions_b26.json',
        totalQuestions: 187,
        blocks: [
            { num: 1, start: 0, end: 47, desc: 'Вопросы 1 - 47' },
            { num: 2, start: 47, end: 94, desc: 'Вопросы 48 - 94' },
            { num: 3, start: 94, end: 141, desc: 'Вопросы 95 - 141' },
            { num: 4, start: 141, end: 187, desc: 'Вопросы 142 - 187' }
        ]
    },
    b27: {
        code: 'Б.2.7',
        name: 'Магистральные нефтепроводы',
        fullName: 'Б.2.7 Магистральные нефтепроводы и нефтепродуктопроводы',
        jsonFile: 'questions_b27.json',
        totalQuestions: 155,
        blocks: [
            { num: 1, start: 0, end: 39, desc: 'Вопросы 1 - 39' },
            { num: 2, start: 39, end: 78, desc: 'Вопросы 40 - 78' },
            { num: 3, start: 78, end: 117, desc: 'Вопросы 79 - 117' },
            { num: 4, start: 117, end: 155, desc: 'Вопросы 118 - 155' }
        ]
    },
    b28: {
        code: 'Б.2.8',
        name: 'Магистральные газопроводы',
        fullName: 'Б.2.8 Магистральные газопроводы',
        jsonFile: 'questions_b28.json',
        totalQuestions: 132,
        blocks: [
            { num: 1, start: 0, end: 33, desc: 'Вопросы 1 - 33' },
            { num: 2, start: 33, end: 66, desc: 'Вопросы 34 - 66' },
            { num: 3, start: 66, end: 99, desc: 'Вопросы 67 - 99' },
            { num: 4, start: 99, end: 132, desc: 'Вопросы 100 - 132' }
        ]
    },
    b211: {
        code: 'Б.2.11',
        name: 'Ремонтные, монтажные и пусконаладочные работы',
        fullName: 'Б.2.11 Промышленная безопасность<br>"Ремонтные, монтажные и пусконаладочные работы на опасных производственных объектах нефтегазодобычи"',
        jsonFile: 'questions_b211.json',
        totalQuestions: 160,
        blocks: [
            { num: 1, start: 0, end: 40, desc: 'Вопросы 1 - 40' },
            { num: 2, start: 40, end: 80, desc: 'Вопросы 41 - 80' },
            { num: 3, start: 80, end: 120, desc: 'Вопросы 81 - 120' },
            { num: 4, start: 120, end: 160, desc: 'Вопросы 121 - 160' }
        ]
    },
    electro2: {
        code: '2 гр.',
        name: 'Электробезопасность (2 группа)',
        fullName: 'Электробезопасность 2 группа<br>До и выше 1000В',
        jsonFile: 'questions_electro2.json',
        totalQuestions: 100,
        blocks: [
            { num: 1, start: 0, end: 25, desc: 'Вопросы 1 - 25' },
            { num: 2, start: 25, end: 50, desc: 'Вопросы 26 - 50' },
            { num: 3, start: 50, end: 75, desc: 'Вопросы 51 - 75' },
            { num: 4, start: 75, end: 100, desc: 'Вопросы 76 - 100' }
        ]
    },
    electro3: {
        code: '3 гр.',
        name: 'Электробезопасность (3 группа)',
        fullName: 'Электробезопасность 3 группа<br>До и выше 1000В',
        jsonFile: 'questions_electro3.json',
        totalQuestions: 120,
        blocks: [
            { num: 1, start: 0, end: 30, desc: 'Вопросы 1 - 30' },
            { num: 2, start: 30, end: 60, desc: 'Вопросы 31 - 60' },
            { num: 3, start: 60, end: 90, desc: 'Вопросы 61 - 90' },
            { num: 4, start: 90, end: 120, desc: 'Вопросы 91 - 120' }
        ]
    },
    electro4: {
        code: '4 гр.',
        name: 'Электробезопасность (4 группа)',
        fullName: 'Электробезопасность 4 группа<br>До и выше 1000В',
        jsonFile: 'questions_electro4.json',
        totalQuestions: 140,
        blocks: [
            { num: 1, start: 0, end: 35, desc: 'Вопросы 1 - 35' },
            { num: 2, start: 35, end: 70, desc: 'Вопросы 36 - 70' },
            { num: 3, start: 70, end: 105, desc: 'Вопросы 71 - 105' },
            { num: 4, start: 105, end: 140, desc: 'Вопросы 106 - 140' }
        ]
    },
    electro5: {
        code: '5 гр.',
        name: 'Электробезопасность (5 группа)',
        fullName: 'Электробезопасность 5 группа<br>До и выше 1000В',
        jsonFile: 'questions_electro5.json',
        totalQuestions: 160,
        blocks: [
            { num: 1, start: 0, end: 40, desc: 'Вопросы 1 - 40' },
            { num: 2, start: 40, end: 80, desc: 'Вопросы 41 - 80' },
            { num: 3, start: 80, end: 120, desc: 'Вопросы 81 - 120' },
            { num: 4, start: 120, end: 160, desc: 'Вопросы 121 - 160' }
        ]
    }
};
