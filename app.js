// Supabase 配置
const SUPABASE_URL = 'https://ujbuxnbrkkvzlsweqapt.supabase.co';
const SUPABASE_ANON_KEY = 'ujbuxnbrkkvzlsweqapt';

// 检查 Supabase 是否加载
if (!window.supabase) {
  console.error('Supabase SDK 未加载');
}

// 初始化 Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// API 配置
const API_BASE = 'https://api.kie.ai/api/v1';

// 主题词汇库
const THEME_VOCABULARY = {
  '超市': {
    core: ['shōu yín yuán 收银员', 'huò jià 货架', 'gù kè 顾客', 'yíng yè yuán 营业员'],
    items: ['píng guǒ 苹果', 'niú nǎi 牛奶', 'miàn bāo 面包', 'shuǐ guǒ 水果', 'shū cài 蔬菜', 'yǐn liào 饮料', 'bǐng gān 饼干', 'tuī chē 推车'],
    env: ['jià qián biāo 价格牌', 'zhǎn lǎn jià 展览架', 'jié zhàng tái 结算台', 'tíng chē chǎng 停车场']
  },
  '医院': {
    core: ['yī shēng 医生', 'hù shi 护士', 'bìng rén 病人', 'bìng fáng 病房'],
    items: ['yào 药', 'zhěn suǒ 诊所', 'bái dà guà 白大褂', 'wēn dù jì 温度计', 'xiě yā jì 血压计', 'bíng lì 病例', 'kǒu zhào 口罩', 'shǒu shù dāo 手术刀'],
    env: ['jiù hù chē 救护车', 'bìng chuáng 病床', 'zhěn liáo shì 诊疗室', 'yào fáng 药房']
  },
  '公园': {
    core: ['pá tóu 爬头', 'huá tī 滑梯', 'qiū qiān 秋千', 'shā kēng 沙坑'],
    items: ['xiǎo péng you 小朋友', 'fēng zheng 风筝', 'bō li qiú 玻璃球', 'wá wa 娃娃', 'xiǎo qì chē 小汽车', 'tiào shéng 跳绳', 'mù mǎ 木马', 'pái qiú 排球'],
    env: ['cǎo píng 草坪', 'huā tán 花坛', 'hú pō 湖泊', 'qiáo 桥', 'lù dēng 路灯', 'cháng yǐ 长椅', 'lù sè 绿色', 'shù yīn 树阴']
  },
  '学校': {
    core: ['lǎo shī 老师', 'tóng xué 同学', 'jiào shì 教室', 'bān zhǎng 班长'],
    items: ['hēi bǎn 黑板', 'fěn bǐ 粉笔', 'kè běn 课本', 'zuò yè 作业', 'qiān bǐ 铅笔', 'gāng bǐ 钢笔', 'xiàng pí 橡皮', 'chǐ zi 尺子'],
    env: ['cāo chǎng 操场', 'tú shū guǎn 图书馆', 'yáo péng 摇棚', 'lǜ chē shì 绿车室', 'cān tīng 餐厅', 'gù dōng shì 固东室', 'wèi shēng jiān 卫生间']
  },
  '餐厅': {
    core: ['péng you 朋友', 'jiā rén 家人', 'fú wù yuán 服务员', 'chú shī 厨师'],
    items: ['fàn cài 饭菜', 'mù gēn 慕耕', 'kāi fēn 开分', 'jiǔ 酒', 'tāng 汤', 'cài 菜', 'mǐ fàn 米饭', 'miàn tiáo 面条'],
    env: ['cān zhuō 餐桌', 'yǐ zi 椅子', 'cān jīn 餐巾', 'dēng guāng 灯光', 'bō li 玻璃', 'huā píng 花瓶', 'zhuō bù 桌布', 'jiǔ diǎn 酒店']
  },
  '家': {
    core: ['bà ba 爸爸', 'mā ma 妈妈', 'gē ge 哥哥', 'jiě jie 姐姐', 'wǒ 我'],
    items: ['chuáng 床', 'yǐ zi 椅子', 'zhuō zi 桌子', 'dēng 灯', 'diàn shì 电视', 'shā fā 沙发', 'kōng tiáo 空调', 'bīng xiāng 冰箱'],
    env: ['chú fáng 厨房', 'wèi shēng jiān 卫生间', 'yáng tái 阳台', 'kè tīng 客厅', 'shū fáng 书房', 'mén kǒu 门口', 'loufáng 楼房']
  }
};

// DOM 元素
const authPage = document.getElementById('authPage');
const appPage = document.getElementById('appPage');
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const authForm = document.getElementById('authForm');
const confirmGroup = document.getElementById('confirmGroup');
const authSubmit = document.getElementById('authSubmit');
const authError = document.getElementById('authError');
const welcomeText = document.getElementById('welcomeText');
const logoutBtn = document.getElementById('logoutBtn');

const apiKeyInput = document.getElementById('apiKey');
const saveApiKeyBtn = document.getElementById('saveApiKey');
const themeInput = document.getElementById('theme');
const titleInput = document.getElementById('title');
const previewBtn = document.getElementById('previewBtn');
const vocabSection = document.getElementById('vocabSection');
const coreTags = document.getElementById('coreTags');
const itemTags = document.getElementById('itemTags');
const envTags = document.getElementById('envTags');
const editBtn = document.getElementById('editBtn');
const generateBtn = document.getElementById('generateBtn');
const statusSection = document.getElementById('statusSection');
const statusText = document.getElementById('statusText');
const progress = document.getElementById('progress');
const resultSection = document.getElementById('resultSection');
const resultImage = document.getElementById('resultImage');
const downloadImageBtn = document.getElementById('downloadImage');
const newGenerateBtn = document.getElementById('newGenerate');

// 全局变量
let currentVocab = null;
let currentTheme = '';
let currentTitle = '';
let isLoginMode = true;
let currentUser = null;

// ============ 密码显示切换 ============
function setupPasswordToggle(toggleBtn, input) {
  toggleBtn.addEventListener('click', () => {
    if (input.type === 'password') {
      input.type = 'text';
      toggleBtn.textContent = '🙈';
    } else {
      input.type = 'password';
      toggleBtn.textContent = '👁';
    }
  });
}

// ============ Supabase 认证函数 ============
async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password
  });
  return { data, error };
}

async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });
  return { data, error };
}

async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// ============ Supabase 数据库函数 ============
async function getApiKey(userId) {
  const { data, error } = await supabase
    .from('user_api_keys')
    .select('api_key')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('获取 API Key 失败:', error);
    return null;
  }
  return data ? data.api_key : null;
}

async function saveApiKeyToDb(userId, apiKey) {
  const { data, error } = await supabase
    .from('user_api_keys')
    .upsert({
      user_id: userId,
      api_key: apiKey
    });

  return { data, error };
}

// ============ 认证界面 ============
function showAuthPage() {
  authPage.style.display = 'flex';
  appPage.style.display = 'none';
}

function showAppPage() {
  authPage.style.display = 'none';
  appPage.style.display = 'block';
  welcomeText.textContent = `欢迎，${currentUser.email}`;
}

function switchToLogin() {
  isLoginMode = true;
  loginTab.classList.add('active');
  registerTab.classList.remove('active');
  confirmGroup.style.display = 'none';
  authSubmit.textContent = '登录';
  authError.textContent = '';
}

function switchToRegister() {
  isLoginMode = false;
  loginTab.classList.remove('active');
  registerTab.classList.add('active');
  confirmGroup.style.display = 'block';
  authSubmit.textContent = '注册';
  authError.textContent = '';
}

async function handleAuth(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (!email || !password) {
    authError.textContent = '请输入邮箱和密码';
    return;
  }

  authError.textContent = '处理中...';

  try {
    if (isLoginMode) {
      const { data, error } = await signIn(email, password);

      if (error) {
        authError.textContent = error.message;
        return;
      }

      currentUser = data.user;
      alert('登录成功！');
      showAppPage();
      loadUserApiKey();

    } else {
      if (password.length < 6) {
        authError.textContent = '密码至少6位';
        return;
      }
      if (password !== confirmPassword) {
        authError.textContent = '两次密码不一致';
        return;
      }

      authError.textContent = '注册中...';
      const { data, error } = await signUp(email, password);

      if (error) {
        authError.textContent = error.message;
        return;
      }

      alert('注册成功！请查收验证邮件后登录。');
      switchToLogin();
      document.getElementById('password').value = '';
    }
  } catch (err) {
    authError.textContent = '操作失败: ' + err.message;
    console.error('Auth error:', err);
  }
}

async function logout() {
  await signOut();
  currentUser = null;
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
  document.getElementById('confirmPassword').value = '';
  apiKeyInput.value = '';
  switchToLogin();
  showAuthPage();
}

async function loadUserApiKey() {
  if (!currentUser) return;

  const apiKey = await getApiKey(currentUser.id);
  if (apiKey) {
    apiKeyInput.value = apiKey;
  }
}

// ============ 应用函数 ============
function init() {
  getSession().then(async (session) => {
    if (session?.user) {
      currentUser = session.user;
      showAppPage();
      loadUserApiKey();
    } else {
      showAuthPage();
      switchToLogin();
    }
  });

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      currentUser = session.user;
      showAppPage();
      loadUserApiKey();
    } else if (event === 'SIGNED_OUT') {
      currentUser = null;
      showAuthPage();
      switchToLogin();
    }
  });

  const togglePassword = document.getElementById('togglePassword');
  const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');

  if (togglePassword && passwordInput) {
    setupPasswordToggle(togglePassword, passwordInput);
  }
  if (toggleConfirmPassword && confirmPasswordInput) {
    setupPasswordToggle(toggleConfirmPassword, confirmPasswordInput);
  }
}

// 保存 API Key
saveApiKeyBtn.addEventListener('click', async () => {
  const key = apiKeyInput.value.trim();
  if (!key) {
    alert('请输入 API Key');
    return;
  }

  if (!currentUser) {
    alert('请先登录');
    return;
  }

  const { error } = await saveApiKeyToDb(currentUser.id, key);

  if (error) {
    alert('保存失败: ' + error.message);
  } else {
    alert('API Key 已保存到云端！');
  }
});

// 获取词汇
function getVocabulary(theme) {
  const normalizedTheme = theme.trim();
  if (THEME_VOCABULARY[normalizedTheme]) {
    return THEME_VOCABULARY[normalizedTheme];
  }
  for (const key in THEME_VOCABULARY) {
    if (normalizedTheme.includes(key) || key.includes(normalizedTheme)) {
      return THEME_VOCABULARY[key];
    }
  }
  return null;
}

// 渲染词汇标签
function renderVocabTags(vocab) {
  coreTags.innerHTML = vocab.core.map(v => `<span class="vocab-tag">${v}</span>`).join('');
  itemTags.innerHTML = vocab.items.map(v => `<span class="vocab-tag">${v}</span>`).join('');
  envTags.innerHTML = vocab.env.map(v => `<span class="vocab-tag">${v}</span>`).join('');
}

// 预览词汇
previewBtn.addEventListener('click', () => {
  currentTheme = themeInput.value.trim();
  currentTitle = titleInput.value.trim();

  if (!currentTheme || !currentTitle) {
    alert('请输入主题和标题');
    return;
  }

  currentVocab = getVocabulary(currentTheme);
  if (!currentVocab) {
    alert('暂不支持该主题');
    return;
  }

  renderVocabTags(currentVocab);
  vocabSection.style.display = 'block';
  vocabSection.scrollIntoView({ behavior: 'smooth' });
});

// 修改
editBtn.addEventListener('click', () => {
  vocabSection.style.display = 'none';
});

// 生成完整提示词
function buildPrompt(theme, title, vocab) {
  return `请生成一张儿童识字小报《${title}》，竖版 A4，学习小报版式，适合 5–9 岁孩子认字与看图识物。

# 一、小报标题区（顶部）

**顶部居中大标题**：《${title}》
* **风格**：十字小报 / 儿童学习报感
* **文本要求**：大字、醒目、卡通手写体、彩色描边
* **装饰**：周围添加与 ${theme} 相关的贴纸风装饰，颜色鲜艳

# 二、小报主体（中间主画面）

画面中心是一幅 **卡通插画风的「${theme}」场景**：
* **整体气氛**：明亮、温暖、积极
* **构图**：物体边界清晰，方便对应文字，不要过于拥挤。

**场景分区与核心内容**
1. **核心区域 A（主要对象）**：表现 ${theme} 的核心活动。
2. **核心区域 B（配套设施）**：展示相关的工具或物品。
3. **核心区域 C（环境背景）**：体现环境特征（如墙面、指示牌等）。

**主题人物**
* **角色**：1 位可爱卡通人物（职业/身份：与 ${theme} 匹配）。
* **动作**：正在进行与场景相关的自然互动。

# 三、必画物体与识字清单（Generated Content）

**请务必在画面中清晰绘制以下物体，并为其预留贴标签的位置：**

**1. 核心角色与设施：**
${vocab.core.join(', ')}

**2. 常见物品/工具：**
${vocab.items.join(', ')}

**3. 环境与装饰：**
${vocab.env.join(', ')}

# 四、识字标注规则

对上述清单中的物体，贴上中文识字标签：
* **格式**：两行制（第一行拼音带声调，第二行简体汉字）。
* **样式**：彩色小贴纸风格，白底黑字或深色字，清晰可读。
* **排版**：标签靠近对应的物体，不遮挡主体。

# 五、画风参数
* **风格**：儿童绘本风 + 识字小报风
* **色彩**：高饱和、明快、温暖
* **质量**：8k resolution, high detail, vector illustration style, clean lines.`;
}

// 获取用户 API Key
async function getUserApiKey() {
  if (!currentUser) return null;
  return await getApiKey(currentUser.id);
}

// 创建任务
async function createTask(prompt) {
  const apiKey = await getUserApiKey();
  if (!apiKey) {
    alert('请先设置 API Key');
    return null;
  }

  const response = await fetch(`${API_BASE}/jobs/createTask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey
    },
    body: JSON.stringify({ prompt })
  });

  const data = await response.json();
  return data;
}

// 查询任务状态
async function queryTask(taskId) {
  const apiKey = await getUserApiKey();

  const response = await fetch(`${API_BASE}/jobs/getTask?taskId=${taskId}`, {
    headers: { 'X-API-Key': apiKey }
  });

  const data = await response.json();
  return data;
}

// 生成图片
generateBtn.addEventListener('click', async () => {
  const apiKey = await getUserApiKey();
  if (!apiKey) {
    alert('请先设置 API Key');
    return;
  }

  const prompt = buildPrompt(currentTheme, currentTitle, currentVocab);

  vocabSection.style.display = 'none';
  statusSection.style.display = 'block';
  statusText.textContent = '正在创建任务...';
  progress.style.width = '30%';

  try {
    const createResult = await createTask(prompt);

    if (createResult.code !== 200) {
      throw new Error(createResult.msg || '创建任务失败');
    }

    const taskId = createResult.data.taskId;
    statusText.textContent = '任务已创建，正在生成图片...';
    progress.style.width = '50%';

    let retries = 0;
    const maxRetries = 60;

    while (retries < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, 5000));

      const result = await queryTask(taskId);

      if (result.data.status === 'success') {
        progress.style.width = '100%';
        statusText.textContent = '生成完成！';

        resultImage.src = result.data.imageUrl;
        resultSection.style.display = 'block';
        statusSection.style.display = 'none';
        return;
      } else if (result.data.status === 'failed') {
        throw new Error('生成失败，请重试');
      }

      statusText.textContent = `生成中... (${Math.floor(retries * 5 / 60)}分钟)`;
      progress.style.width = `${50 + (retries / maxRetries * 50)}%`;
      retries++;
    }

    throw new Error('生成超时，请重试');

  } catch (error) {
    alert('生成失败: ' + error.message);
    statusSection.style.display = 'none';
    vocabSection.style.display = 'block';
  }
});

// 下载图片
downloadImageBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = resultImage.src;
  link.download = `儿童识字小报_${Date.now()}.png`;
  link.click();
});

// 重新生成
newGenerateBtn.addEventListener('click', () => {
  resultSection.style.display = 'none';
  progress.style.width = '0%';
  themeInput.value = '';
  titleInput.value = '';
  currentTheme = '';
  currentTitle = '';
  currentVocab = null;
});

// ============ 事件绑定 ============
loginTab.addEventListener('click', switchToLogin);
registerTab.addEventListener('click', switchToRegister);
authForm.addEventListener('submit', handleAuth);
logoutBtn.addEventListener('click', logout);

// ============ 初始化 ============
init();
