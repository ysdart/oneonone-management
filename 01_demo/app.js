// HTMX設定とカスタムJavaScript

// HTMXの設定
document.addEventListener('DOMContentLoaded', function() {
    // 初期ページ読み込み
    loadPage('./pages/dashboard.html');
    
    // サイドバーのアクティブ状態管理
    document.body.addEventListener('htmx:afterRequest', function(event) {
        // サイドバーのアクティブ状態を更新
        document.querySelectorAll('.sidebar .list-group-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // クリックされたアイテムをアクティブにする
        const clickedItem = event.detail.elt.closest('.list-group-item');
        if (clickedItem) {
            clickedItem.classList.add('active');
        }
    });
});

// ページ読み込み関数
function loadPage(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const container = document.getElementById('main-content');
            container.innerHTML = html;
            // 読み込まれたページ内の<script>を実行
            runScriptsInContainer(container);
            // ページ固有の初期化
            executePageScripts();
        })
        .catch(error => {
            console.error('ページの読み込みに失敗しました:', error);
            document.getElementById('main-content').innerHTML = '<div class="alert alert-danger">ページの読み込みに失敗しました</div>';
        });
}

// ページ固有のスクリプトを実行
function executePageScripts() {
    // カレンダー初期化
    if (typeof initCalendar === 'function') {
        const calendarContainer = document.getElementById('calendar-container');
        if (calendarContainer) {
            calendarContainer.innerHTML = initCalendar();
        }
    }
    
    // その他のページ固有の初期化処理
    if (typeof updateTotalEvaluation === 'function') {
        updateTotalEvaluation();
    }
}

// コンテナ内の<script>タグを動的に実行
function runScriptsInContainer(container) {
    const scripts = container.querySelectorAll('script');
    scripts.forEach((oldScript) => {
        const newScript = document.createElement('script');
        // type属性がある場合も継承
        if (oldScript.type) newScript.type = oldScript.type;
        if (oldScript.src) {
            newScript.src = oldScript.src;
        } else {
            newScript.text = oldScript.textContent;
        }
        document.body.appendChild(newScript);
        // 実行後にクリーンアップ
        setTimeout(() => newScript.parentNode && newScript.parentNode.removeChild(newScript), 0);
    });
}

// カレンダー機能
function initCalendar() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // カレンダーの日付を生成
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    let calendarHTML = '';
    
    // カレンダーヘッダー
    calendarHTML += '<div class="row">';
    ['日', '月', '火', '水', '木', '金', '土'].forEach(day => {
        calendarHTML += `<div class="col text-center fw-bold">${day}</div>`;
    });
    calendarHTML += '</div>';
    
    // カレンダー本体
    let day = 1;
    for (let week = 0; week < 6; week++) {
        calendarHTML += '<div class="row">';
        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
            if (week === 0 && dayOfWeek < startingDayOfWeek) {
                calendarHTML += '<div class="col calendar-day"></div>';
            } else if (day <= daysInMonth) {
                const isToday = day === today.getDate();
                const hasEvent = Math.random() > 0.7; // サンプルデータ
                const dayClass = `calendar-day ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}`;
                
                calendarHTML += `
                    <div class="col ${dayClass}">
                        ${day}
                        ${hasEvent ? '<div class="event-indicator"></div>' : ''}
                    </div>
                `;
                day++;
            } else {
                calendarHTML += '<div class="col calendar-day"></div>';
            }
        }
        calendarHTML += '</div>';
    }
    
    return calendarHTML;
}

// 評価スライダーの更新
function updateEvaluationValue(sliderId, valueId) {
    const slider = document.getElementById(sliderId);
    const valueDisplay = document.getElementById(valueId);
    if (slider && valueDisplay) {
        valueDisplay.textContent = slider.value;
    }
}

// Markdownプレビューの切り替え
function toggleMarkdownPreview(editorId, previewId) {
    const editor = document.getElementById(editorId);
    const preview = document.getElementById(previewId);
    
    if (editor && preview) {
        // 簡単なMarkdown変換（実際の実装ではライブラリを使用）
        const markdown = editor.value;
        const html = markdown
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
        
        preview.innerHTML = html;
    }
}

// 進捗サークルの更新
function updateProgressCircle(circleId, progress) {
    const circle = document.getElementById(circleId);
    if (circle) {
        circle.style.setProperty('--progress', `${progress * 3.6}deg`);
        circle.textContent = `${progress}%`;
    }
}

// フォームバリデーション
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// 通知表示
function showNotification(message, type = 'info') {
    const alertClass = {
        'success': 'alert-success',
        'error': 'alert-danger',
        'warning': 'alert-warning',
        'info': 'alert-info'
    }[type] || 'alert-info';
    
    const notification = document.createElement('div');
    notification.className = `alert ${alertClass} alert-dismissible fade show position-fixed`;
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // 5秒後に自動削除
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}
