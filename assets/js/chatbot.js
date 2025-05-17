document.addEventListener('DOMContentLoaded', function() {
    const sendMessage = document.getElementById('sendMessage');
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');
    const suggestionChips = document.querySelectorAll('.chip');

    // Current time function
    function getCurrentTime() {
        const now = new Date();
        return now.getHours().toString().padStart(2, '0') + ':' + 
               now.getMinutes().toString().padStart(2, '0');
    }

    // Add message to chat
    function addMessage(type, content) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);

        if (type === 'bot') {
            messageDiv.innerHTML = `
                <img src="assets/image/cukurova_logo (1).png" alt="Bot Avatar" class="message-avatar">
                <div class="message-content">
                    <div class="message-text">${content}</div>
                    <span class="message-time">${getCurrentTime()}</span>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-text">${content}</div>
                    <span class="message-time">${getCurrentTime()}</span>
                </div>
            `;
        }

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send message function
    function sendUserMessage(message) {
        if (message.trim()) {
            // Add user message
            addMessage('user', message);
            
            // Get bot response
            getBotResponse(message);
            
            // Clear input
            userInput.value = '';
        }
    }

    // Bot response function
    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Response patterns
        const responses = {
            'merhaba': 'Merhaba! Size nasıl yardımcı olabilirim?',
            'selam': 'Selam! Nasıl yardımcı olabilirim?',
            'kütüphane': 'Merkez Kütüphane hafta içi 08:00-23:00, hafta sonu 09:00-22:00 saatleri arasında hizmet vermektedir.',
            'nerede': 'Balcalı Mahallesi, Çukurova Üniversitesi Merkez Kampüsü, 01330 Sarıçam/Adana adresinde bulunuyoruz.',
            'yemekhane': 'Öğle yemeği 11:30-14:00, akşam yemeği 17:00-19:00 saatleri arasında servis edilmektedir. Günlük menüyü görmek için yemekhane.cu.edu.tr adresini ziyaret edebilirsiniz.',
            'iletişim': 'Bize 0322 XXX XX XX numaralı telefondan veya info@cu.edu.tr adresinden ulaşabilirsiniz.',
            'teşekkür': 'Rica ederim! Başka bir konuda yardıma ihtiyacınız olursa bana sorabilirsiniz.',
            'görüşürüz': 'İyi günler! Tekrar görüşmek üzere!'
        };

        // Default response
        let response = 'Üzgünüm, bu konuda bilgim yok. Lütfen farklı bir şekilde sorunuzu ifade edin veya başka bir soru sorun.';

        // Check if message contains any of our keywords
        for (let key in responses) {
            if (lowerMessage.includes(key)) {
                response = responses[key];
                break;
            }
        }

        // Add bot response with a small delay
        setTimeout(() => {
            addMessage('bot', response);
        }, 500);
    }

    // Event Listeners
    sendMessage.addEventListener('click', () => {
        sendUserMessage(userInput.value);
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendUserMessage(userInput.value);
        }
    });

    // Suggestion chips click handlers
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const message = chip.dataset.message;
            sendUserMessage(message);
        });
    });
});