// Permite depósito desde el popup de formulario
window.depositFromPopup = function(amount) {
    state.cash += parseFloat(amount);
    updateBalance();
    showActionPopup('deposit', `You deposited €${parseFloat(amount).toFixed(2)}`);
}
        // Estado de la aplicación
        const state = {
            cash: 10000,
            portfolio: {},
            currentScreen: 'home',
            currentTradeStock: null,
            currentHolding: null,
            tutorials: {
                basics: { completed: 0, total: 3 },
                stocks: { completed: 0, total: 4 },
                risk: { completed: 0, total: 3 },
                theory: { completed: 0, total: 4 }
            }
        };

        const stocks = [
            { name: 'Apple Inc.', symbol: 'AAPL', price: 178.45, change: 2.34, icon: '🍎' },
            { name: 'Tesla Inc.', symbol: 'TSLA', price: 242.18, change: -1.56, icon: '⚡' },
            { name: 'Microsoft Corp.', symbol: 'MSFT', price: 378.91, change: 3.12, icon: '💻' },
            { name: 'Amazon.com Inc.', symbol: 'AMZN', price: 145.32, change: 1.89, icon: '📦' },
            { name: 'NVIDIA Corp.', symbol: 'NVDA', price: 495.67, change: 5.43, icon: '🎮' },
            { name: 'Alphabet Inc.', symbol: 'GOOGL', price: 138.21, change: -0.78, icon: '🔤' },
            { name: 'Meta Platforms', symbol: 'META', price: 312.44, change: 2.67, icon: '📱' }
        ];

        

        function showDepositModal() {
            const amount = prompt('How much do you want to deposit? (€)');
            if (amount && !isNaN(amount) && amount > 0) {
                state.cash += parseFloat(amount);
                updateBalance();
                alert(`You deposited €${parseFloat(amount).toFixed(2)}`);
            }
        }

        function showWithdrawModal() {
            const amount = prompt('How much do you want to withdraw? (€)');
            if (amount && !isNaN(amount) && amount > 0) {
                if (parseFloat(amount) <= state.cash) {
                    state.cash -= parseFloat(amount);
                    updateBalance();
                    alert(`You withdrew €${parseFloat(amount).toFixed(2)}`);
                } else {
                    alert('Insufficient funds');
                }
            }
        }

        const tutorials = [
            {
                id: 'basics',
                title: 'Investment Fundamentals',
                icon: '📚',
                description: 'Learn the basic concepts of the stock market and how to start investing.',
                lessons: [
                    {
                        title: 'What are stocks?',
                        content: 'Stocks represent a share of ownership in a company. When you buy stocks, you become a shareholder and own a small part of that company. Companies issue stocks to raise capital and fund their growth.',
                        quiz: {
                            question: 'What do you get when you buy shares of a company?',
                            options: [
                                'A loan to the company',
                                'Partial ownership of the company',
                                'A job at the company',
                                'Free products'
                            ],
                            correct: 1
                        }
                    },
                    {
                        title: 'Supply and Demand',
                        content: 'The price of stocks is determined by supply and demand. If more people want to buy a stock (high demand), the price goes up. If more people want to sell (high supply), the price goes down. This is the fundamental principle of the market.',
                        quiz: {
                            question: 'What happens when there are more buyers than sellers?',
                            options: [
                                'The price goes down',
                                'The price stays the same',
                                'The price goes up',
                                'The stock stops trading'
                            ],
                            correct: 2
                        }
                    },
                    {
                        title: 'Diversification',
                        content: 'Diversification means not putting all your eggs in one basket. Investing in different companies, sectors, and asset types reduces risk. If one investment performs poorly, others can compensate.',
                        quiz: {
                            question: 'Why is diversification important?',
                            options: [
                                'To make more money quickly',
                                'To reduce risk',
                                'Because it is mandatory',
                                'To pay less taxes'
                            ],
                            correct: 1
                        }
                    }
                ]
            },
            {
                id: 'stocks',
                title: 'Stock Analysis',
                icon: '📈',
                description: 'Discover how to analyze and select the best stocks for your portfolio.',
                lessons: [
                    {
                        title: 'Fundamental Analysis',
                        content: 'Fundamental analysis evaluates the intrinsic value of a company by examining its finances, management, competitive advantage, and growth prospects. It includes reviewing financial statements, ratios like P/E (price/earnings), and the overall health of the business.',
                        quiz: {
                            question: 'What does fundamental analysis examine?',
                            options: [
                                'Only price charts',
                                'The company’s finances and health',
                                'Market rumors',
                                'Only the current price'
                            ],
                            correct: 1
                        }
                    },
                    {
                        title: 'Financial Ratios',
                        content: 'Key ratios include: P/E (how much you pay for each euro of profit), ROE (return on equity), and debt/equity (level of indebtedness). A low P/E may indicate an undervalued stock, but you should always consider the sector context.',
                        quiz: {
                            question: 'What does the P/E ratio indicate?',
                            options: [
                                'Price relative to earnings',
                                'The age of the company',
                                'Number of employees',
                                'Total sales'
                            ],
                            correct: 0
                        }
                    },
                    {
                        title: 'Market Capitalization',
                        content: 'Market capitalization (market cap) is the total value of all a company’s shares. It is calculated by multiplying the share price by the total number of shares. Companies are classified as: small cap (< €2B), mid cap (€2B-€10B), and large cap (> €10B).',
                        quiz: {
                            question: 'How is market capitalization calculated?',
                            options: [
                                'Price × Number of shares',
                                'Annual profits',
                                'Total assets',
                                'Yearly sales'
                            ],
                            correct: 0
                        }
                    },
                    {
                        title: 'Dividends',
                        content: 'Dividends are regular payments that some companies make to their shareholders from their profits. Not all companies pay dividends; some prefer to reinvest earnings in growth. Dividend yield is calculated as: annual dividend / share price.',
                        quiz: {
                            question: 'What are dividends?',
                            options: [
                                'Loans from the company',
                                'Payments to shareholders from profits',
                                'Government bonds',
                                'Trading commissions'
                            ],
                            correct: 1
                        }
                    }
                ]
            },
            {
                id: 'risk',
                title: 'Risk Management',
                icon: '🛡️',
                description: 'Learn how to protect your capital and manage risk in your investments.',
                lessons: [
                    {
                        title: 'Types of Risk',
                        content: 'There are several types of risk: market risk (general market movements), company-specific risk (problems of a particular company), sector risk (problems in an industry), and liquidity risk (difficulty selling). Understanding these risks helps you make better decisions.',
                        quiz: {
                            question: 'What is market risk?',
                            options: [
                                'Problems of a specific company',
                                'General market movements',
                                'Only affects cryptocurrencies',
                                'There is no such risk'
                            ],
                            correct: 1
                        }
                    },
                    {
                        title: 'Stop Loss and Take Profit',
                        content: 'A stop loss is an automatic order to sell if the price falls to a certain level, limiting your losses. A take profit does the opposite: it sells automatically when you reach your profit target. These tools help you manage emotions and protect your capital.',
                        quiz: {
                            question: 'What is a stop loss for?',
                            options: [
                                'To make more money',
                                'To automatically limit losses',
                                'To buy more shares',
                                'To pay fewer commissions'
                            ],
                            correct: 1
                        }
                    },
                    {
                        title: 'Time Horizon',
                        content: 'Your investment horizon (how long you plan to hold your investments) affects your risk strategy. Short-term investments (< 1 year) are more volatile. In the long term (5+ years) you can take on more risk because you have time to recover from market downturns.',
                        quiz: {
                            question: 'Why does the long term allow more risk?',
                            options: [
                                'Because it is safer',
                                'You have time to recover from losses',
                                'Commissions are lower',
                                'Taxes are lower'
                            ],
                            correct: 1
                        }
                    }
                ]
            }
        ];

        // Funciones de navegación
        function switchScreen(screen) {
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            
            if (screen === 'home') {
                document.getElementById('homeScreen').classList.add('active');
                document.querySelectorAll('.nav-item')[0].classList.add('active');
                state.currentScreen = 'home';
                renderStocks();
            } else if (screen === 'portfolio') {
                document.getElementById('portfolioScreen').classList.add('active');
                document.querySelectorAll('.nav-item')[1].classList.add('active');
                state.currentScreen = 'portfolio';
                renderPortfolio();
            } else if (screen === 'tutorials') {
                document.getElementById('tutorialsScreen').classList.add('active');
                document.querySelectorAll('.nav-item')[2].classList.add('active');
                state.currentScreen = 'tutorials';
                renderTutorials();
            }
        }

        // Render stock list
        function renderStocks(filter = '') {
            const stocksList = document.getElementById('stocksList');
            stocksList.innerHTML = '';
            
            const filteredStocks = stocks.filter(stock => 
                stock.name.toLowerCase().includes(filter.toLowerCase()) || 
                stock.symbol.toLowerCase().includes(filter.toLowerCase())
            );

            if (filteredStocks.length === 0) {
                stocksList.innerHTML = '<div class="empty-state"><div class="empty-icon">🔍</div><div>No stocks found</div></div>';
                return;
            }
            
            filteredStocks.forEach(stock => {
                const changeClass = stock.change >= 0 ? 'positive' : 'negative';
                const changeSymbol = stock.change >= 0 ? '+' : '';
                
                const stockItem = document.createElement('div');
                stockItem.className = 'stock-item';
                stockItem.onclick = () => openTradeModal(stock);
                
                stockItem.innerHTML = `
                    <div class="stock-icon">${stock.icon}</div>
                    <div class="stock-info">
                        <div class="stock-name">${stock.name}</div>
                        <div class="stock-symbol">${stock.symbol}</div>
                    </div>
                    <div class="stock-price-info">
                        <div class="stock-price">€${stock.price.toFixed(2)}</div>
                        <div class="stock-change ${changeClass}">${changeSymbol}${stock.change.toFixed(2)}%</div>
                    </div>
                `;
                
                stocksList.appendChild(stockItem);
            });
        }

        // Render portfolio
        function renderPortfolio() {
            const portfolioList = document.getElementById('portfolioList');
            portfolioList.innerHTML = '';
            
            const portfolioKeys = Object.keys(state.portfolio);
            
            if (portfolioKeys.length === 0) {
                portfolioList.innerHTML = '<div class="empty-state"><div class="empty-icon">💼</div><div>Your portfolio is empty<br><small>Buy your first stock in the Home section</small></div></div>';
                return;
            }
            
            portfolioKeys.forEach(symbol => {
                const holding = state.portfolio[symbol];
                const stock = stocks.find(s => s.symbol === symbol);
                const currentValue = holding.shares * stock.price;
                const profit = currentValue - holding.totalCost;
                const profitPercent = ((profit / holding.totalCost) * 100).toFixed(2);
                
                const portfolioItem = document.createElement('div');
                portfolioItem.className = 'portfolio-item';
                
                portfolioItem.innerHTML = `
                    <div class="portfolio-left">
                        <div class="portfolio-stock-name">${stock.name}</div>
                        <div class="portfolio-shares">${holding.shares} shares · ${stock.symbol}</div>
                    </div>
                    <div class="portfolio-right">
                        <div class="portfolio-value">€${currentValue.toFixed(2)}</div>
                        <div class="portfolio-profit ${profit >= 0 ? 'stock-change positive' : 'stock-change negative'}">
                            ${profit >= 0 ? '+' : ''}€${profit.toFixed(2)} (${profit >= 0 ? '+' : ''}${profitPercent}%)
                        </div>
                    </div>
                `;
                
                portfolioList.appendChild(portfolioItem);
            });
        }

        // Buy modal
        function openTradeModal(stock) {
            state.currentTradeStock = stock;
            document.getElementById('modalTitle').textContent = 'Buy';
            document.getElementById('modalStockIcon').textContent = stock.icon;
            document.getElementById('modalStockName').textContent = stock.name;
            document.getElementById('modalStockSymbol').textContent = stock.symbol;
            document.getElementById('modalStockPrice').textContent = `€${stock.price.toFixed(2)}`;
            document.getElementById('quantityInput').value = 1;
            updateTotalCost();
            document.getElementById('tradeModal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('tradeModal').classList.remove('active');
            state.currentTradeStock = null;
        }

        function updateTotalCost() {
            const quantity = parseInt(document.getElementById('quantityInput').value) || 0;
            const total = quantity * state.currentTradeStock.price;
            document.getElementById('totalCost').textContent = `Total: €${total.toFixed(2)}`;
        }

        function executeTrade() {
            const quantity = parseInt(document.getElementById('quantityInput').value);
            const stock = state.currentTradeStock;
            const totalCost = quantity * stock.price;
            
            if (quantity <= 0) {
                alert('Please enter a valid quantity');
                return;
            }
            
            if (totalCost > state.cash) {
                alert('Insufficient funds');
                return;
            }
            
            state.cash -= totalCost;
            
            if (state.portfolio[stock.symbol]) {
                state.portfolio[stock.symbol].shares += quantity;
                state.portfolio[stock.symbol].totalCost += totalCost;
            } else {
                state.portfolio[stock.symbol] = {
                    shares: quantity,
                    totalCost: totalCost
                };
            }
            
            updateBalance();
            closeModal();
            showPurchasePopup(`You bought ${quantity} shares of ${stock.name} (${stock.symbol})! 🚀`);
        }

        // Update balance
        function updateBalance() {
            let portfolioValue = 0;
            Object.keys(state.portfolio).forEach(symbol => {
                const stock = stocks.find(s => s.symbol === symbol);
                portfolioValue += state.portfolio[symbol].shares * stock.price;
            });
            
            const totalValue = state.cash + portfolioValue;
            const change = totalValue - 10000;
            const changePercent = ((change / 10000) * 100).toFixed(2);
            
            document.getElementById('balance').textContent = `€${totalValue.toFixed(2)}`;
            document.getElementById('portfolioBalance').textContent = `€${totalValue.toFixed(2)}`;
            
            const changeText = `${change >= 0 ? '+' : ''}€${change.toFixed(2)} (${change >= 0 ? '+' : ''}${changePercent}%)`;
            document.getElementById('change').textContent = changeText;
            document.getElementById('portfolioChange').textContent = changeText;
            
            document.getElementById('change').className = change >= 0 ? 'balance-change' : 'balance-change negative';
            document.getElementById('portfolioChange').className = change >= 0 ? 'balance-change' : 'balance-change negative';
        }

        // Renderizar tutoriales
        function renderTutorials() {
            const tutorialsList = document.getElementById('tutorialsList');
            tutorialsList.innerHTML = '';
            
            tutorials.forEach(tutorial => {
                const progress = state.tutorials[tutorial.id];
                const progressPercent = (progress.completed / progress.total) * 100;
                
                const card = document.createElement('div');
                card.className = 'tutorial-card';
                card.onclick = () => openTutorial(tutorial);
                
                card.innerHTML = `
                    <div class="tutorial-header">
                        <div class="tutorial-icon">${tutorial.icon}</div>
                        <div class="tutorial-title">${tutorial.title}</div>
                    </div>
                    <div class="tutorial-description">${tutorial.description}</div>
                    <div class="tutorial-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progressPercent}%"></div>
                        </div>
                        <span>${progress.completed}/${progress.total}</span>
                    </div>
                `;
                
                tutorialsList.appendChild(card);
            });
        }

        // Abrir tutorial interactivo
        function openTutorial(tutorial) {
            const modal = document.getElementById('tutorialModal');
            const lessonsContainer = document.getElementById('tutorialLessons');
            lessonsContainer.innerHTML = '';
            
            tutorial.lessons.forEach((lesson, index) => {
                const lessonCard = document.createElement('div');
                lessonCard.className = 'lesson-card';
                
                lessonCard.innerHTML = `
                    <div class="lesson-number">Lección ${index + 1}</div>
                    <div class="lesson-title">${lesson.title}</div>
                    <div class="lesson-text">${lesson.content}</div>
                    <div class="quiz-question">
                        <div class="quiz-title">🎯 Questions</div>
                        <div style="margin-bottom: 12px;">${lesson.quiz.question}</div>
                        ${lesson.quiz.options.map((option, i) => `
                            <div class="quiz-option" onclick="checkAnswer(${i}, ${lesson.quiz.correct}, this, '${tutorial.id}', ${index})">${option}</div>
                        `).join('')}
                    </div>
                `;
                
                lessonsContainer.appendChild(lessonCard);
            });
            
            modal.classList.add('active');
        }

        function closeTutorial() {
            document.getElementById('tutorialModal').classList.remove('active');
            renderTutorials();
        }

        function checkAnswer(selected, correct, element, tutorialId, lessonIndex) {
            const options = element.parentElement.querySelectorAll('.quiz-option');
            options.forEach(opt => {
                opt.style.pointerEvents = 'none';
            });
            
            if (selected === correct) {
                element.classList.add('correct');
                
                if (lessonIndex >= state.tutorials[tutorialId].completed) {
                    state.tutorials[tutorialId].completed = lessonIndex + 1;
                }
                
                setTimeout(() => {
                    alert('Correct! 🎉');
                }, 300);
            } else {
                element.classList.add('incorrect');
                options[correct].classList.add('correct');
                setTimeout(() => {
                    alert('Incorrect. Review the lesson and try again. ');
                }, 300);
            }
        }

        // Event listeners
        document.getElementById('searchInput').addEventListener('input', (e) => {
            renderStocks(e.target.value);
        });

        document.getElementById('quantityInput').addEventListener('input', updateTotalCost);

        // Simulación de cambios de precio
        setInterval(() => {
            stocks.forEach(stock => {
                const changePercent = (Math.random() - 0.5) * 2;
                stock.price *= (1 + changePercent / 100);
                stock.change = changePercent;
            });
            
            if (state.currentScreen === 'home') {
                renderStocks(document.getElementById('searchInput').value);
            } else if (state.currentScreen === 'portfolio') {
                renderPortfolio();
            }
            
            updateBalance();
        }, 5000);

// Settings functionality
let marketUpdateInterval;
let volatilityMultiplier = 1;

function switchScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    if (screen === 'home') {
        document.getElementById('homeScreen').classList.add('active');
        document.querySelectorAll('.nav-item')[0].classList.add('active');
        state.currentScreen = 'home';
        renderStocks();
    } else if (screen === 'portfolio') {
        document.getElementById('portfolioScreen').classList.add('active');
        document.querySelectorAll('.nav-item')[1].classList.add('active');
        state.currentScreen = 'portfolio';
        renderPortfolio();
    } else if (screen === 'tutorials') {
        document.getElementById('tutorialsScreen').classList.add('active');
        document.querySelectorAll('.nav-item')[2].classList.add('active');
        state.currentScreen = 'tutorials';
        renderTutorials();
    } else if (screen === 'settings') {
        document.getElementById('settingsScreen').classList.add('active');
        document.querySelectorAll('.nav-item')[3].classList.add('active');
        state.currentScreen = 'settings';
    }
}

// Actualiza el botón de settings en el nav
// Cambia: onclick="alert('Settings - Coming soon')"
// Por: onclick="switchScreen('settings')"

function showEditProfile() {
    const modal = document.getElementById('settingsModal');
    document.getElementById('settingsModalTitle').textContent = 'Edit Profile';
    document.getElementById('settingsModalContent').innerHTML = `
        <div class="settings-modal-section">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Display Name</label>
            <input type="text" class="settings-modal-input" id="profileName" value="Investor" placeholder="Enter your name">
        </div>
        <div class="settings-modal-section">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Avatar Letter</label>
            <input type="text" class="settings-modal-input" id="profileAvatar" maxlength="1" value="S" placeholder="S">
        </div>
        <button class="settings-modal-btn" onclick="saveProfile()">Save Changes</button>
    `;
    modal.classList.add('active');
}

function saveProfile() {
    const name = document.getElementById('profileName').value || 'Investor';
    const avatar = document.getElementById('profileAvatar').value.toUpperCase() || 'S';
    document.querySelector('.profile-icon').textContent = avatar;
    closeSettingsModal();
    showPurchasePopup('Profile updated successfully! ✨');
}

function showLanguageSelector() {
    const modal = document.getElementById('settingsModal');
    document.getElementById('settingsModalTitle').textContent = 'Select Language';
    document.getElementById('settingsModalContent').innerHTML = `
        <div class="settings-option-list">
            <div class="settings-option-item selected" onclick="selectLanguage('English', this)">
                🇬🇧 English
            </div>
            <div class="settings-option-item" onclick="selectLanguage('Español', this)">
                🇪🇸 Español
            </div>
            <div class="settings-option-item" onclick="selectLanguage('Français', this)">
                🇫🇷 Français
            </div>
            <div class="settings-option-item" onclick="selectLanguage('Deutsch', this)">
                🇩🇪 Deutsch
            </div>
        </div>
    `;
    modal.classList.add('active');
}

function selectLanguage(language, element) {
    document.querySelectorAll('.settings-option-item').forEach(item => {
        item.classList.remove('selected');
    });
    element.classList.add('selected');
    document.getElementById('currentLanguage').textContent = language;
    setTimeout(() => {
        closeSettingsModal();
        showPurchasePopup(`Language changed to ${language}! 🌍`);
    }, 300);
}

function showResetPortfolio() {
    const modal = document.getElementById('settingsModal');
    document.getElementById('settingsModalTitle').textContent = 'Reset Portfolio';
    document.getElementById('settingsModalContent').innerHTML = `
        <div style="text-align: center; padding: 20px 0;">
            <div style="font-size: 64px; margin-bottom: 16px;">⚠️</div>
            <p style="font-size: 18px; margin-bottom: 12px;">Are you sure?</p>
            <p style="color: #888; line-height: 1.6;">
                This will reset your portfolio to €10,000 and remove all your current investments. 
                This action cannot be undone.
            </p>
        </div>
        <button class="settings-modal-btn danger" onclick="confirmReset()">Yes, Reset Portfolio</button>
        <button class="settings-modal-btn secondary" onclick="closeSettingsModal()" style="background: rgba(255,255,255,0.1); margin-top: 12px;">Cancel</button>
    `;
    modal.classList.add('active');
}

function confirmReset() {
    state.cash = 10000;
    state.portfolio = {};
    updateBalance();
    closeSettingsModal();
    showPurchasePopup('Portfolio reset successfully! 🔄');
}

function toggleAnimations() {
    const toggle = document.getElementById('animationsToggle');
    if (toggle.checked) {
        document.body.style.setProperty('--animation-speed', '0.3s');
    } else {
        document.body.style.setProperty('--animation-speed', '0s');
    }
}

function toggleRealtime() {
    const toggle = document.getElementById('realtimeToggle');
    if (toggle.checked) {
        startMarketUpdates();
    } else {
        stopMarketUpdates();
    }
}

function startMarketUpdates() {
    if (marketUpdateInterval) clearInterval(marketUpdateInterval);
    marketUpdateInterval = setInterval(() => {
        stocks.forEach(stock => {
            const changePercent = (Math.random() - 0.5) * 2 * volatilityMultiplier;
            stock.price *= (1 + changePercent / 100);
            stock.change = changePercent;
        });
        
        if (state.currentScreen === 'home') {
            renderStocks(document.getElementById('searchInput').value);
        } else if (state.currentScreen === 'portfolio') {
            renderPortfolio();
        }
        
        updateBalance();
    }, 5000);
}

function stopMarketUpdates() {
    if (marketUpdateInterval) {
        clearInterval(marketUpdateInterval);
        marketUpdateInterval = null;
    }
}

function showVolatilitySettings() {
    const modal = document.getElementById('settingsModal');
    document.getElementById('settingsModalTitle').textContent = 'Market Volatility';
    const levels = {
        'Low': 0.5,
        'Normal': 1,
        'High': 2,
        'Extreme': 3
    };
    const current = Object.keys(levels).find(key => levels[key] === volatilityMultiplier) || 'Normal';
    
    document.getElementById('settingsModalContent').innerHTML = `
        <div style="padding: 16px 0; color: #ccc; line-height: 1.6; margin-bottom: 16px;">
            Control how quickly stock prices change. Higher volatility means more dramatic price movements.
        </div>
        <div class="settings-option-list">
            ${Object.keys(levels).map(level => `
                <div class="settings-option-item ${current === level ? 'selected' : ''}" onclick="selectVolatility('${level}', ${levels[level]}, this)">
                    ${level} ${level === 'Low' ? '🐌' : level === 'Normal' ? '🚶' : level === 'High' ? '🏃' : '🚀'}
                </div>
            `).join('')}
        </div>
    `;
    modal.classList.add('active');
}

function selectVolatility(level, multiplier, element) {
    document.querySelectorAll('.settings-option-item').forEach(item => {
        item.classList.remove('selected');
    });
    element.classList.add('selected');
    volatilityMultiplier = multiplier;
    document.getElementById('volatilityLevel').textContent = level;
    setTimeout(() => {
        closeSettingsModal();
        showPurchasePopup(`Volatility set to ${level}! 📊`);
    }, 300);r
}

function showAbout() {
    const modal = document.getElementById('settingsModal');
    document.getElementById('settingsModalTitle').textContent = 'About Your Invest';
    document.getElementById('settingsModalContent').innerHTML = `
        <div style="text-align: center; padding: 20px 0;">
            <div style="font-size: 72px; margin-bottom: 16px;">💼</div>
            <h3 style="font-size: 24px; margin-bottom: 8px;">Your Invest</h3>
            <p style="color: #888; margin-bottom: 24px;">Version 1.0.0</p>
            <p style="color: #ccc; line-height: 1.8; text-align: left;">
                Your Invest is a comprehensive investment simulation platform designed to help you learn about stock trading, 
                portfolio management, and financial markets in a risk-free environment.
            </p>
            <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
                <p style="color: #888; font-size: 14px;">
                    Built with ❤️ for educational purposes
                </p>
            </div>
        </div>
        <button class="settings-modal-btn" onclick="closeSettingsModal()">Close</button>
    `;
    modal.classList.add('active');
}

function showHelp() {
    const modal = document.getElementById('settingsModal');
    document.getElementById('settingsModalTitle').textContent = 'Help & Support';
    document.getElementById('settingsModalContent').innerHTML = `
        <div style="padding: 16px 0;">
            <div style="margin-bottom: 24px;">
                <h4 style="font-size: 16px; margin-bottom: 12px; color: #3b82f6;">📚 Getting Started</h4>
                <p style="color: #ccc; line-height: 1.6; font-size: 14px;">
                    Start by exploring the Market tab to see available stocks. Click on any stock to buy shares. 
                    Visit the Academy to learn investment strategies.
                </p>
            </div>
            <div style="margin-bottom: 24px;">
                <h4 style="font-size: 16px; margin-bottom: 12px; color: #3b82f6;">💼 Portfolio Management</h4>
                <p style="color: #ccc; line-height: 1.6; font-size: 14px;">
                    Track your investments in the Portfolio tab. Monitor profits/losses in real-time and make informed decisions.
                </p>
            </div>
            <div style="margin-bottom: 24px;">
                <h4 style="font-size: 16px; margin-bottom: 12px; color: #3b82f6;">🎓 Learning Resources</h4>
                <p style="color: #ccc; line-height: 1.6; font-size: 14px;">
                    Access comprehensive tutorials in the Academy section. Complete quizzes to test your knowledge.
                </p>
            </div>
        </div>
        <button class="settings-modal-btn" onclick="closeSettingsModal()">Got it!</button>
    `;
    modal.classList.add('active');
}

function closeSettingsModal() {
    document.getElementById('settingsModal').classList.remove('active');
}

// Render portfolio - ACTUALIZAR ESTA FUNCIÓN
function renderPortfolio() {
    const portfolioList = document.getElementById('portfolioList');
    portfolioList.innerHTML = '';
    
    const portfolioKeys = Object.keys(state.portfolio);
    
    if (portfolioKeys.length === 0) {
        portfolioList.innerHTML = '<div class="empty-state"><div class="empty-icon">💼</div><div>Your portfolio is empty<br><small>Buy your first stock in the Home section</small></div></div>';
        return;
    }
    
    portfolioKeys.forEach(symbol => {
        const holding = state.portfolio[symbol];
        const stock = stocks.find(s => s.symbol === symbol);
        const currentValue = holding.shares * stock.price;
        const profit = currentValue - holding.totalCost;
        const profitPercent = ((profit / holding.totalCost) * 100).toFixed(2);
        
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.onclick = () => openSellModal(stock, holding);
        
        portfolioItem.innerHTML = `
            <div class="portfolio-left">
                <div class="portfolio-stock-name">${stock.name}</div>
                <div class="portfolio-shares">${holding.shares} shares · ${stock.symbol}</div>
            </div>
            <div class="portfolio-right">
                <div class="portfolio-value">€${currentValue.toFixed(2)}</div>
                <div class="portfolio-profit ${profit >= 0 ? 'stock-change positive' : 'stock-change negative'}">
                    ${profit >= 0 ? '+' : ''}€${profit.toFixed(2)} (${profit >= 0 ? '+' : ''}${profitPercent}%)
                </div>
            </div>
        `;
        
        portfolioList.appendChild(portfolioItem);
    });
}

// AÑADIR ESTAS NUEVAS FUNCIONES

// Abrir modal de venta
function openSellModal(stock, holding) {
    state.currentTradeStock = stock;
    state.currentHolding = holding;
    
    const currentValue = holding.shares * stock.price;
    const profit = currentValue - holding.totalCost;
    const profitPercent = ((profit / holding.totalCost) * 100).toFixed(2);
    
    document.getElementById('modalTitle').textContent = 'Sell';
    document.getElementById('modalStockIcon').textContent = stock.icon;
    document.getElementById('modalStockName').textContent = stock.name;
    document.getElementById('modalStockSymbol').textContent = `${stock.symbol} · You own ${holding.shares} shares`;
    document.getElementById('modalStockPrice').textContent = `€${stock.price.toFixed(2)}`;
    
    const quantityInput = document.getElementById('quantityInput');
    quantityInput.value = holding.shares;
    quantityInput.max = holding.shares;
    
    updateSellTotalValue();
    
    // Cambiar el texto del botón
    const confirmBtn = document.querySelector('.confirm-btn');
    confirmBtn.textContent = 'Confirm Sale';
    confirmBtn.style.background = 'linear-gradient(135deg, #ff4466 0%, #cc3355 100%)';
    confirmBtn.onclick = executeSell;
    
    // Añadir información de ganancia/pérdida
    const modalStockInfo = document.querySelector('.modal-stock-info');
    const profitInfo = document.createElement('div');
    profitInfo.id = 'profitInfo';
    profitInfo.style.cssText = 'margin-top: 12px; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px;';
    profitInfo.innerHTML = `
        <div style="font-size: 13px; color: #888; margin-bottom: 6px;">Current Position</div>
        <div style="font-size: 18px; font-weight: 600; color: ${profit >= 0 ? '#3b82f6' : '#ff4466'};">
            ${profit >= 0 ? '+' : ''}€${profit.toFixed(2)} (${profit >= 0 ? '+' : ''}${profitPercent}%)
        </div>
    `;
    modalStockInfo.appendChild(profitInfo);
    
    document.getElementById('tradeModal').classList.add('active');
}

// Actualizar el valor total de venta
function updateSellTotalValue() {
    const quantity = parseInt(document.getElementById('quantityInput').value) || 0;
    const total = quantity * state.currentTradeStock.price;
    const holding = state.currentHolding;
    
    // Calcular ganancia/pérdida de la cantidad seleccionada
    const avgCostPerShare = holding.totalCost / holding.shares;
    const costOfSelling = avgCostPerShare * quantity;
    const profitFromSale = total - costOfSelling;
    const profitPercent = ((profitFromSale / costOfSelling) * 100).toFixed(2);
    
    document.getElementById('totalCost').innerHTML = `
        <div style="margin-bottom: 8px;">You will receive: <strong>€${total.toFixed(2)}</strong></div>
        <div style="font-size: 13px; color: ${profitFromSale >= 0 ? '#3b82f6' : '#ff4466'};">
            ${profitFromSale >= 0 ? 'Profit' : 'Loss'}: ${profitFromSale >= 0 ? '+' : ''}€${profitFromSale.toFixed(2)} (${profitFromSale >= 0 ? '+' : ''}${profitPercent}%)
        </div>
    `;
}

// Ejecutar venta
function executeSell() {
    const quantity = parseInt(document.getElementById('quantityInput').value);
    const stock = state.currentTradeStock;
    const holding = state.currentHolding;
    const totalSale = quantity * stock.price;
    
    if (quantity <= 0) {
        alert('Please enter a valid quantity');
        return;
    }
    
    if (quantity > holding.shares) {
        alert(`You only have ${holding.shares} shares to sell`);
        return;
    }
    
    // Calcular ganancia/pérdida
    const avgCostPerShare = holding.totalCost / holding.shares;
    const costOfSelling = avgCostPerShare * quantity;
    const profitFromSale = totalSale - costOfSelling;
    
    // Actualizar estado
    state.cash += totalSale;
    
    if (quantity === holding.shares) {
        // Vender todas las acciones - eliminar del portfolio
        delete state.portfolio[stock.symbol];
    } else {
        // Vender parte de las acciones
        state.portfolio[stock.symbol].shares -= quantity;
        state.portfolio[stock.symbol].totalCost -= costOfSelling;
    }
    
    updateBalance();
    closeModal();
    
    const profitMsg = profitFromSale >= 0 
        ? `with a profit of €${profitFromSale.toFixed(2)}! 💰` 
        : `with a loss of €${Math.abs(profitFromSale).toFixed(2)} 📉`;
    
    showPurchasePopup(`You sold ${quantity} shares of ${stock.name} (${stock.symbol}) ${profitMsg}`);
    
    // Si estamos en la pantalla de portfolio, actualizar
    if (state.currentScreen === 'portfolio') {
        renderPortfolio();
    }
}

// MODIFICAR la función closeModal para restaurar el botón de compra
function closeModal() {
    document.getElementById('tradeModal').classList.remove('active');
    state.currentTradeStock = null;
    state.currentHolding = null;
    
    // Remover información de ganancia si existe
    const profitInfo = document.getElementById('profitInfo');
    if (profitInfo) {
        profitInfo.remove();
    }
    
    // Restaurar el botón a modo compra
    const confirmBtn = document.querySelector('.confirm-btn');
    confirmBtn.textContent = 'Confirm Purchase';
    confirmBtn.style.background = 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)';
    confirmBtn.onclick = executeTrade;
    
    // Restaurar el input
    const quantityInput = document.getElementById('quantityInput');
    quantityInput.removeAttribute('max');
}

// MODIFICAR el event listener del quantityInput
document.getElementById('quantityInput').addEventListener('input', function() {
    if (state.currentHolding) {
        updateSellTotalValue();
    } else {
        updateTotalCost();
    }
});


// Initialize market updates on load
startMarketUpdates();

        // Inicializar
        renderStocks();
        updateBalance();
