// src/components/Intro.tsx
import React from 'react';
import './PasswordIntro.css';
import { Link } from 'react-router-dom';
import { RoutePaths } from '../../../../router/RoutePaths';

const PasswordIntro: React.FC = () => {
    return (
        <section className="intro-container">
            <h2><strong>Ласкаво просимо на наш сервіс генерації паролів!</strong></h2>
            <br></br>
            <p>
        Цей сайт створений командою студентів 3 курсу НТУ «ХПІ» з метою допомогти користувачам
        легко створювати надійні паролі та перевіряти безпечність вже існуючих. Ми розуміємо,
        наскільки важливо захищати особисту інформацію в цифрову епоху, тому розробили інструмент,
        який поєднує простоту у використанні та високий рівень безпеки.
            </p>
            <ul>
                <li className="no-marker">На нашому сайті ви зможете:</li>
                <li>🔐 <strong>Згенерувати надійний пароль</strong> за власними критеріями (довжина, наявність символів, цифр тощо);</li>
                <li>🛡️ <strong>Перевірити свій пароль</strong> на стійкість до зламів.</li>
                <li>👾 <strong>Поспілкуватися з ШІ-асистентом,</strong> якщо потрібна допомога.</li>
                <li>📊 <strong>Дослідити математичну стійкість,</strong> для оцінки криптостійкості.</li>
            </ul>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Link 
                    to={RoutePaths.RESEARCH} 
                    className="btn btn-primary"
                    style={{ 
                        textDecoration: 'none', 
                        padding: '10px 20px', 
                        display: 'inline-block',
                        borderRadius: '4px'
                    }}
                >
                    📊 Дослідити математичну стійкість
                </Link>
            </div>
            <br></br>
            <p>
                <i>Забезпечте свій цифровий захист вже зараз — це просто, швидко й ефективно!</i>
            </p>

        </section>
    );
};

export default PasswordIntro;
