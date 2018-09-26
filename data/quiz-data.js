const quizData = {
  questionList: [
    {
      id: 'participant-name',
      type: 'text',
      prompt: 'Your name (in romaji)',
      required: true,
      validationType: 'regex',
      validationPattern: '[a-zA-Z -]+',
      validationHint: 'ローマ字でお名前を入力してください'
    },
    {
      id: 'participant-email',
      type: 'email',
      prompt: 'Your email',
      required: true,
    },
    {
      id: 'question-001',
      type: 'stack-rank',
      prompt: 'もし可能であれば、誰と一緒にお食事したい？',
      required: true,
      answers: [
        '阿部寛',
        '徳井義実',
        '安倍首相',
        '徳川家康',
      ],
      rankingWeight: 1.0,
    },
    {
      id: 'question-002',
      type: 'stack-rank',
      prompt: 'どういう時笑いますか？',
      required: true,
      answers: [
        'お笑いコメディアン',
        'ブラックユーモア',
        '落語',
        '下品・下ネタ',
      ],
      rankingWeight: 2.0,
    },
    {
      id: 'question-003',
      type: 'stack-rank',
      prompt: '土曜日の楽しみ方は？',
      required: true,
      answers: [
        'ハイキング',
        'netflix',
        '買い物',
        '運動・スポーツ',
      ],
      rankingWeight: 2.0,
    },
    {
      id: 'question-004',
      type: 'stack-rank',
      prompt: '感謝を感じるのは？',
      required: true,
      answers: [
        '両親',
        '健康',
        '友人',
        '恋人',
      ],
      rankingWeight: 1.5,
    },
    {
      id: 'question-005',
      type: 'stack-rank',
      prompt: '食べたいお料理は？',
      required: true,
      answers: [
        'お寿司',
        'ラーメン',
        'パスた',
        'ハンバーガー',
      ],
      rankingWeight: 1.0,
    },
  ],
};

module.exports = {
  quizData,
};
