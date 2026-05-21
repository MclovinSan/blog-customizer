import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useEffect, useState, useRef } from 'react';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from './../../constants/articleProps';

import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

type Tprops = {
	onSubmit: (value: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({ onSubmit, onReset }: Tprops) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState({ ...defaultArticleState });
	const formRef = useRef<HTMLElement | null>(null);
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit({ ...formState });
	};

	useEffect(() => {
		if (!isOpen) return;
		const handleMouseEvent = (e: MouseEvent) => {
			const target = e.target;
			if (
				target instanceof Node &&
				formRef.current &&
				!formRef.current.contains(target)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleMouseEvent);

		return () => document.removeEventListener('mousedown', handleMouseEvent);
	}, [isOpen]);

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={formRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифты'
						onChange={(value) =>
							setFormState((prev) => ({ ...prev, fontFamilyOption: value }))
						}></Select>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='Размер шрифта'
						onChange={(value) =>
							setFormState((prev) => ({ ...prev, fontSizeOption: value }))
						}></RadioGroup>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(value) =>
							setFormState((prev) => ({ ...prev, fontColor: value }))
						}></Select>
					<hr className={styles.divider} />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(value) =>
							setFormState((prev) => ({ ...prev, backgroundColor: value }))
						}></Select>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(value) =>
							setFormState((prev) => ({ ...prev, contentWidth: value }))
						}></Select>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								onReset();
								setFormState({ ...defaultArticleState });
							}}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
