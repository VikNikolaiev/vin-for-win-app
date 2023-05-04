import { useRouter } from 'next/router';
import styles from './LocaleSwitcher.module.less';
import { useStore } from '@/context/mainContext';
import Link from 'next/link';
import { Option, SelectIcon } from '@avtopro/select';
import GlobeIcon from '@avtopro/icons/dist/jsx/GlobeIcon';

const LocaleSwitcher = () => {
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
        <SelectIcon
            defaultValue="1"
            framed={true}
            toggleIcon={<GlobeIcon color="#418ACA" />}
            dropdownPosition="left"
            dropdown={true}
            isMobile={true}
        >
            {router.locales?.map((lang) => (
                <Option key={lang}>
                    <Link href={router.asPath} locale={lang}>
                                                {lang}
                    </Link>
                </Option>
            ))}
        </SelectIcon>
    );
};

export default LocaleSwitcher;
