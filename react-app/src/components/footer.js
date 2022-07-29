import './footer.css';

const CustomFooter = () => {
    const url={
        'luis':{
            'github':'https://github.com/stuffy-doll',
            'linkedIn': 'https://www.linkedin.com/in/luis-sanchez-b96077235/'
        },
        'ethan':{
            'github':'https://github.com/eebrowning',
            'linkedIn':'https://www.linkedin.com/in/ethan-browning-42a032118/'
        },
        'allen':{
            'github':'https://github.com/aFaughn',
            'linkedIn':'https://www.linkedin.com/in/allen-faughn-4a3502235/'
        },
        'jingxun':{
            'github':'https://github.com/jxyin0513',
            'linkedIn':'https://www.linkedin.com/in/jingxun-yin-30397b156/'
        }

    }
    return (
        <div className='footer-wrapper'>
            <div className='luis'></div>
                <ul className='footer-links'>
                    <li>
                        <a href={url.luis.github}>
                            <img src='/assets/images/github.png' className='gitHub' alt='gitHub' />
                            <p>stuffy-doll</p>
                        </a>
                    </li>
                    <li>

                        <a href={url.luis.linkedIn}>
                            <img src='/assets/images/linkedIn.png' className='linkedIn' alt='linkedIn' />
                            <p>Luis Sanchez-Porras</p>
                        </a>

         
                    </li>
                </ul>
            <div className='ethan'></div>
                <ul className='footer-links'>
                    <li>
                        <a href={url.ethan.github}>
                            <img src='/assets/images/github.png' className='gitHub' alt='gitHub' />
                            <p>ebrowning</p>
                        </a>
                    </li>
                    <li>

                        <a href={url.ethan.linkedIn}>
                            <img src='/assets/images/linkedIn.png' className='linkedIn' alt='linkedIn' />
                            <p>Ethan Browning</p>
                        </a>

                    </li>
                </ul>
            <div className='allen'></div>
                <ul className='footer-links'>
                    <li>
                        <a href={url.allen.github}>
                            <img src='/assets/images/github.png' className='gitHub' alt='gitHub' />
                            <p>aFaughn</p>
                        </a>
                    </li>
                    <li>

                        <a href={url.allen.linkedIn}>
                            <img src='/assets/images/linkedIn.png' className='linkedIn' alt='linkedIn' />
                            <p>Allen Faughn</p>
                        </a>

                    </li>
                </ul>
            <div className='jingxun'></div>
                <ul className='footer-links'>
                    <li>
                        <a href={url.jingxun.github}>
                            <img src='/assets/images/github.png' className='gitHub' alt='gitHub' />
                            <p>jxyin0513</p>
                        </a>
                    </li>
                    <li>

                        <a href={url.jingxun.linkedIn}>
                            <img src='/assets/images/linkedIn.png' className='linkedIn' alt='linkedIn' />
                            <p>Jingxun Yin</p>
                        </a>

                    </li>
                </ul>
        </div>
    )
}

export default CustomFooter
