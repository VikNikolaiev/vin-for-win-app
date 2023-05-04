import { useStore } from '@/context/mainContext';
import GlobeIcon from '@avtopro/icons/dist/jsx/GlobeIcon';
import { Option, SelectIcon } from '@avtopro/select';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import styles from './LocaleSwitcher.module.less';

const LocaleSwitcher = () => {
    const { i18n } = useTranslation();
    const router = useRouter();
    const { locales } = router;
    const { car } = useStore();

    const changeLanguage = (_: undefined, value: [string]): void => {
        localStorage.setItem('lang', value[0]);
        router.push(router.asPath, router.asPath, { locale: value[0] });
        if (car.parts.length) {
            car.getParts(car.engine);
        }
    };

    return (
        <div className={styles.switcher}>
            <SelectIcon
                onChange={changeLanguage}
                className={styles.switcher__select}
                framed={false}
                visibleOptionsCount={5}
                defaultValue={i18n.language}
                toggleIcon={<GlobeIcon />}
                dropdownPosition="auto"
                dropdown
                blockSize="sm"
            >
                {locales?.map((locale) => (
                    <Option
                        className={styles.switcher__option}
                        key={locale}
                        value={locale}
                    >
                        {locale}
                    </Option>
                ))}
            </SelectIcon>
        </div>
    );
};

export default LocaleSwitcher;
