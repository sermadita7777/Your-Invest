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
                    alert('¡Correcto! 🎉');
                }, 300);
            } else {
                element.classList.add('incorrect');
                options[correct].classList.add('correct');
                setTimeout(() => {
                    alert('Incorrecto. Revisa la lección nuevamente.');
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

        // Inicializar
        renderStocks();
        updateBalance();
