// 现代JavaScript ES6+ 语法
'use strict';

// 使用类来组织代码
class BirthdayWebsite {
    constructor() {
        this.particles = [];
        this.hearts = [];
        this.isParticlesRunning = false;
        this.isHeartsRunning = false;

        // 绑定方法到实例
        this.createParticle = this.createParticle.bind(this);
        this.createHeart = this.createHeart.bind(this);

        this.init();
    }

    // 初始化方法
    init() {
        this.setupEventListeners();
        this.startParticleAnimation();
        this.addCardHoverEffects();
        this.addScrollAnimations();
    }

    // 设置事件监听器
    setupEventListeners() {
        // 获取DOM元素
        const surpriseBtn = document.getElementById('surpriseBtn');
        const surpriseSection = document.getElementById('surpriseSection');

        // 调试信息
        console.log('惊喜按钮元素:', surpriseBtn);
        console.log('惊喜区域元素:', surpriseSection);

        // 惊喜按钮点击事件
        if (surpriseBtn) {
            surpriseBtn.addEventListener('click', (e) => {
                console.log('惊喜按钮被点击了！');
                this.showSurprise(surpriseSection);
                this.startHeartsAnimation();
            });
        } else {
            console.error('找不到惊喜按钮元素！');
        }

        // 键盘访问性支持
        if (surpriseBtn) {
            surpriseBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    console.log('通过键盘触发惊喜！');
                    this.showSurprise(surpriseSection);
                    this.startHeartsAnimation();
                }
            });
        }

        // 卡片点击事件
        document.querySelectorAll('.card').forEach((card, index) => {
            card.addEventListener('click', (e) => {
                this.playCardAnimation(card, index, e);
            });
        });

        // 响应式处理
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
    }

    // 显示惊喜内容
    showSurprise(surpriseSection) {
        console.log('showSurprise 被调用，参数:', surpriseSection);

        if (!surpriseSection) {
            console.error('惊喜区域元素不存在！');
            return;
        }

        console.log('添加 show 类到惊喜区域');
        surpriseSection.classList.add('show');

        // 平滑滚动到惊喜部分
        setTimeout(() => {
            console.log('开始滚动到惊喜区域');
            surpriseSection.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 300);

        // 添加打字机效果
        this.addTypewriterEffect();
    }

    // 打字机效果
    addTypewriterEffect() {
        const messages = document.querySelectorAll('.love-message p');
        messages.forEach((msg, index) => {
            setTimeout(() => {
                msg.style.opacity = '1';
                msg.style.transform = 'translateX(0)';
            }, index * 200);
        });
    }

    // 卡片动画
    playCardAnimation(card, index, event) {
        // 添加特殊效果类
        card.classList.add('clicked');

        // 创建涟漪效果
        this.createRippleEffect(card, event);

        // 移除效果类
        setTimeout(() => {
            card.classList.remove('clicked');
        }, 600);

        // 根据卡片类型播放不同音效（如果需要）
        this.playCardSound(index);
    }

    // 创建涟漪效果
    createRippleEffect(element, event) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = (event?.clientX || rect.left + rect.width / 2) - rect.left - size / 2;
        const y = (event?.clientY || rect.top + rect.height / 2) - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 10;
        `;

        element.style.position = 'relative';
        element.appendChild(ripple);

        // 添加CSS动画
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // 播放卡片音效（占位符）
    playCardSound(index) {
        // 这里可以添加音效播放逻辑
        console.log(`Playing sound for card ${index + 1}`);
    }

    // 粒子动画系统
    startParticleAnimation() {
        if (this.isParticlesRunning) return;

        this.isParticlesRunning = true;
        const particlesContainer = document.getElementById('particles');

        if (!particlesContainer) return;

        // 创建初始粒子
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.createParticle(particlesContainer);
            }, i * 100);
        }

        // 持续创建粒子
        this.particleInterval = setInterval(() => {
            this.createParticle(particlesContainer);
        }, 500);
    }

    // 创建单个粒子
    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // 随机位置和动画延迟
        const x = Math.random() * window.innerWidth;
        const animationDelay = Math.random() * 6;
        const animationDuration = 6 + Math.random() * 4;

        particle.style.cssText = `
            left: ${x}px;
            animation-delay: ${animationDelay}s;
            animation-duration: ${animationDuration}s;
        `;

        container.appendChild(particle);
        this.particles.push(particle);

        // 清理粒子
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
            this.particles = this.particles.filter(p => p !== particle);
        }, (animationDuration + animationDelay) * 1000);
    }

    // 心形动画系统
    startHeartsAnimation() {
        if (this.isHeartsRunning) return;

        this.isHeartsRunning = true;
        const heartsContainer = document.getElementById('hearts');

        if (!heartsContainer) return;

        // 创建心形
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createHeart(heartsContainer);
            }, i * 200);
        }

        // 持续创建心形（持续10秒）
        this.heartInterval = setInterval(() => {
            this.createHeart(heartsContainer);
        }, 300);

        // 10秒后停止
        setTimeout(() => {
            clearInterval(this.heartInterval);
            this.isHeartsRunning = false;
        }, 10000);
    }

    // 创建单个心形
    createHeart(container) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '💖';

        // 随机位置和大小
        const x = Math.random() * window.innerWidth;
        const size = 0.8 + Math.random() * 0.8;
        const animationDuration = 4 + Math.random() * 2;

        heart.style.cssText = `
            left: ${x}px;
            font-size: ${size * 1.5}rem;
            animation-duration: ${animationDuration}s;
        `;

        container.appendChild(heart);
        this.hearts.push(heart);

        // 清理心形
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
            this.hearts = this.hearts.filter(h => h !== heart);
        }, animationDuration * 1000);
    }

    // 卡片悬停效果
    addCardHoverEffects() {
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // 添加悬停时的额外效果
                card.style.transform = 'translateY(-10px) scale(1.02) rotateX(5deg)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });

            // 鼠标移动效果
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `
                    translateY(-10px) 
                    scale(1.02) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg)
                `;
            });
        });
    }

    // 滚动动画
    addScrollAnimations() {
        // 使用 Intersection Observer API
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // 观察所有需要动画的元素
        document.querySelectorAll('.card, .magic-button').forEach(el => {
            observer.observe(el);
        });
    }

    // 响应式处理
    handleResize() {
        // 清理现有粒子
        this.particles.forEach(particle => {
            if (particle.parentNode) {
                particle.remove();
            }
        });
        this.particles = [];

        // 重新启动粒子动画
        if (this.particleInterval) {
            clearInterval(this.particleInterval);
        }
        this.isParticlesRunning = false;
        this.startParticleAnimation();
    }

    // 防抖函数
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 清理方法
    destroy() {
        // 清理定时器
        if (this.particleInterval) {
            clearInterval(this.particleInterval);
        }
        if (this.heartInterval) {
            clearInterval(this.heartInterval);
        }

        // 清理粒子和心形
        [...this.particles, ...this.hearts].forEach(element => {
            if (element.parentNode) {
                element.remove();
            }
        });

        this.particles = [];
        this.hearts = [];
    }
}

// 工具函数
const utils = {
    // 随机数生成
    random: (min, max) => Math.random() * (max - min) + min,

    // 元素是否在视口中
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // 平滑滚动到元素
    scrollToElement: (element, offset = 0) => {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
};

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 已加载完成');

    // 检查是否支持现代浏览器特性
    if ('IntersectionObserver' in window && 'Promise' in window) {
        console.log('浏览器支持现代特性，开始初始化...');

        // 初始化网站
        const website = new BirthdayWebsite();

        // 将实例挂载到全局，便于调试
        window.birthdayWebsite = website;

        // 页面卸载时清理
        window.addEventListener('beforeunload', () => {
            website.destroy();
        });

        console.log('🎉 生日祝福网站已成功加载！');

        // 额外的调试：直接测试按钮
        setTimeout(() => {
            const testBtn = document.getElementById('surpriseBtn');
            const testSection = document.getElementById('surpriseSection');
            console.log('延迟测试 - 按钮元素:', testBtn);
            console.log('延迟测试 - 惊喜区域:', testSection);

            if (testBtn) {
                console.log('按钮可见性:', window.getComputedStyle(testBtn).display);
                console.log('按钮位置:', testBtn.getBoundingClientRect());

                // 添加备用事件监听器
                testBtn.addEventListener('click', function (e) {
                    console.log('备用事件监听器被触发！');
                    if (testSection) {
                        testSection.classList.add('show');
                        testSection.scrollIntoView({ behavior: 'smooth', block: 'center' });

                        // 创建心形动画
                        const heartsContainer = document.getElementById('hearts');
                        if (heartsContainer && window.birthdayWebsite) {
                            window.birthdayWebsite.startHeartsAnimation();
                        }
                    }
                });
            }
        }, 1000);

    } else {
        console.warn('您的浏览器不支持某些现代特性，网站功能可能受限。');
        // 提供降级方案
        document.body.classList.add('legacy-browser');
    }
});

// 导出类和工具函数（如果使用模块系统）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BirthdayWebsite, utils };
} 