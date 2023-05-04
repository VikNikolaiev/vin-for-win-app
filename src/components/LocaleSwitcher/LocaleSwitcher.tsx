// import React from 'react';
// import GlobeIcon from '@avtopro/icons/dist/jsx/GlobeIcon';
// import SelectIcon, { Option } from '@avtopro/select';
// import { useTranslation } from 'next-i18next';
// import { useRouter } from 'next/router';
// import styles from './Locale.module.less';

// const LocaleSwitcher = () => {
//     const { i18n } = useTranslation();
//     const router = useRouter();
//     const { locales } = router;

//     const changeLanguage = (_: undefined, value: [string]): void => {
//         router.push(router.asPath, router.asPath, { locale: value[0] });
//     };

//     return (
//         <div className={styles.switcher}>
//             <SelectIcon
//                 onChange={changeLanguage}
//                 className={styles.switcher__select}
//                 framed={false}
//                 visibleOptionsCount={5}
//                 defaultValue={i18n.language}
//                 toggleIcon={<GlobeIcon />}
//                 dropdownPosition="auto"
//                 dropdown
//                 blockSize="sm"
//             >
//                 {locales?.map((locale) => (
//                     <Option
//                         className={styles.switcher__option}
//                         key={locale}
//                         value={locale}
//                     >
//                         {locale}
//                     </Option>
//                 ))}
//             </SelectIcon>
//         </div>
//     );
// };

// export default LocaleSwitcher;

import { useRouter } from 'next/router';

import Link from 'next/link';

import { Option, SelectIcon } from '@avtopro/select';

import GlobeIcon from '@avtopro/icons/dist/jsx/GlobeIcon';

const LocaleSwitcher = () => {
    const router = useRouter();

    return (
        <SelectIcon
            defaultValue="1"
            framed={true}
            toggleIcon={<GlobeIcon color="#418ACA" />}
            dropdownPosition="left"
            dropdown={true}
            isMobile={true}
        >
                       {' '}
            {router.locales?.map((lang) => (
                <Option key={lang}>
                                       {' '}
                    <Link href={router.asPath} locale={lang}>
                                                {lang}                   {' '}
                    </Link>
                                   {' '}
                </Option>
            ))}
                   {' '}
        </SelectIcon>
    );
};

export default LocaleSwitcher;
