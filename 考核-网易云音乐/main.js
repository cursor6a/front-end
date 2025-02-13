// 模拟歌单数据
const mockPlaylists = [
    {
        id: 1,
        title: "还是会想你 | 一个人听的华语慢情歌",
        coverUrl: "https://p1.music.126.net/FkWG32qp1H85N9QOKEB-Mw==/109951170460850551.jpg",
        playCount: "120.6万"
    },
    {
        id: 2,
        title: "冬日City Pop | 雪季中的复古律动",
        coverUrl: "https://p1.music.126.net/iBHb2HEruKKXmEVaO2QSUw==/109951170379738682.jpg",
        playCount: "35916"
    },
    {
        id: 3,
        title: "一周古典上新 | 赵成珍柔情演绎拉威尔G大调钢琴协奏曲",
        coverUrl: "https://p1.music.126.net/WkZvVzPjUM6rv8N9Z6LBYg==/109951170460254010.jpg",
        playCount: "602.3万"
    },
    {
        id: 4,
        title: "爵士新歌到 | Martina DaSilva为娓娓道来新歌故事",
        coverUrl: "https://p1.music.126.net/EarwfddIr_GTdGK5xRNPyQ==/109951170420007625.jpg",
        playCount: "97159"
    },
    {
        id: 5,
        title: "Trap | 陷入毒性说唱的迷幻陷阱",
        coverUrl: "https://p1.music.126.net/3fNtzlN_Et9WwhZnayJXnQ==/109951168801199449.jpg",
        playCount: "86.1万"
    },
    {
        id: 6,
        title: "咖啡办公室 | hi打工人 来杯冰美式提神吧",
        coverUrl: "https://p1.music.126.net/SCS6tJfchvWZFZjaqm7xsg==/109951169213161665.jpg",
        playCount: "57.7万"
    },
    {
        id: 7,
        title: "沉浸式思考 | 全神贯注 向内心求索",
        coverUrl: "https://p1.music.126.net/w-V1dK2J9lzWYMGOW7FohA==/109951168607138632.jpg",
        playCount: "112.8万"
    },
    {
        id: 8,
        title: "专四专八备考 | 考前百日冲刺的电子提神剂",
        coverUrl: "https://p1.music.126.net/RWE3_DYBZhZGD2lIuw6tUQ==/109951169235151575.jpg",
        playCount: "62400"
    },
    {
        id: 9,
        title: "跑步听K-Pop | 动感旋律助你畅快前行",
        coverUrl: "https://p1.music.126.net/xIlR9dRIxH64_PO_l3W0AQ==/109951169071604859.jpg",
        playCount: "30.6万"
    },
    {
        id: 10,
        title: "粤语抚慰剂 | 给努力生活的我们一点鼓励",
        coverUrl: "https://p1.music.126.net/65eWncCahdnSZPdTi4Fv7Q==/109951169410527118.jpg",
        playCount: "23.5万"
    }
];

// 加载歌单
function loadPlaylists() {
    const container = document.getElementById('playlistContainer');

    // 清空容器
    container.innerHTML = '';

    // 添加歌单卡片
    mockPlaylists.forEach(playlist => {
        const card = createPlaylistCard(playlist);
        container.appendChild(card);
    });
}

// 创建歌单卡片
function createPlaylistCard(playlist) {
    const card = document.createElement('div');
    card.className = 'playlist-card';

    // 格式化播放次数
    const formattedCount = formatPlayCount(playlist.playCount);

    card.innerHTML = `
        <img src="${playlist.coverUrl}" alt="${playlist.title}">
        <div class="play-count">
            <i class="iconfont icon-play"></i>
            ${formattedCount}
        </div>
        <div class="title">${playlist.title}</div>
    `;

    return card;
}

// 格式化播放次数
function formatPlayCount(count) {
    if (typeof count === 'string') {
        return count;
    }
    if (count > 100000000) {
        return Math.floor(count / 100000000) + '亿';
    }
    if (count > 10000) {
        return Math.floor(count / 10000) + '万';
    }
    return count;
}

function search() {
    let val = document.querySelector('.search-bar input').value;
    if (val) {   // 确保输入不为空
        window.location.href = 'https://music.163.com/#/search/m/?s=' + val;
    }
}

// 初始化搜索功能
function initSearch() {
    let btn = document.querySelector('.search-btn');
    btn.addEventListener('click', search)
    document.querySelector('.search-bar input').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {  // 回车也能执行搜索功能
            search()
        }
    });
}

// 添加更多分类功能
function initMoreCategories() {
    const moreBtn = document.querySelector('.more');
    const popup = document.querySelector('.more-categories-popup');

    // 点击更多分类按钮
    moreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moreBtn.classList.toggle('active');
        popup.classList.toggle('show');
    });

    // 点击页面其他区域关闭弹出窗口
    document.addEventListener('click', (e) => {
        if (!moreBtn.contains(e.target) && !popup.contains(e.target)) {
            moreBtn.classList.remove('active');
            popup.classList.remove('show');
        }
    });

    // 点击分类项
    popup.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            // 更新当前选中分类
            const categoryLinks = document.querySelectorAll('.category-nav a');
            categoryLinks.forEach(link => link.classList.remove('active'));
            moreBtn.classList.remove('active');
            popup.classList.remove('show');
            
            loadPlaylists();
        }
    });
}

// 初始化页面
function initPage() {
    loadPlaylists();
    initSearch();
    initMoreCategories();

    // 绑定分类切换事件
    const categoryLinks = document.querySelectorAll('.category-nav a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // 移除其他active类
            categoryLinks.forEach(l => l.classList.remove('active'));
            // 添加当前active类
            link.classList.add('active');
            // 实际项目中这里应该根据分类加载对应的歌单
            loadPlaylists();
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initPage); 