"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Search, Download, FileText, Stethoscope, BookOpen } from "lucide-react";
import Header from "@/app/components/Header"; 
import Footer from "@/app/components/Footer";

// Повний масив усіх послуг
const servicesData = [
  // --- МЕДИЧНІ ПОСЛУГИ ---
  { category: "Медичні послуги", code: "A67009", name: "Консультація ерготерапевта", price: "300" },
  { category: "Медичні послуги", code: "A67015", name: "Консультація лікаря з ультразвукової діагностики", price: "270" },
  { category: "Медичні послуги", code: "A67018", name: "Консультація лікаря з функціональної діагностики", price: "270" },
  { category: "Медичні послуги", code: "A67022", name: "Консультація лікаря фізичної та реабілітаційної медицини", price: "200-500" },
  { category: "Медичні послуги", code: "A67009", name: "Первинне реабілітаційне обстеження ерготерапевтом", price: "490" },
  { category: "Медичні послуги", code: "А67022", name: "Первинне реабілітаційне обстеження фізичним терапевтом", price: "490" },
  { category: "Медичні послуги", code: "А67039", name: "Первинне реабілітаційне обстеження лікаря фізичної та реабілітаційної медицини", price: "455" },
  { category: "Медичні послуги", code: "N67001", name: "Консультація лікаря - невролога дитячого", price: "265" },
  { category: "Медичні послуги", code: "96008-00", name: "Неврологічне обстеження", price: "265" },
  { category: "Медичні послуги", code: "L67001", name: "Консультація ортопеда-травматолога дитячого", price: "270" },
  { category: "Медичні послуги", code: "A67004", name: "Консультація лікаря - педіатра", price: "270" },
  { category: "Медичні послуги", code: "P67002", name: "Консультація лікаря - психіатра дитячого", price: "270" },
  { category: "Медичні послуги", code: "96236-00", name: "Первинне обстеження психічного стану", price: "575" },
  { category: "Медичні послуги", code: "96237-00", name: "Комплексне обстеження психічного стану", price: "575" },
  { category: "Медичні послуги", code: "А67008", name: "Консультація лікаря - рентгенолога", price: "245" },
  { category: "Медичні послуги", code: "A67039", name: "Консультація фізичного терапевта", price: "305" },
  { category: "Медичні послуги", code: "A67037", name: "Консультація лікаря - хірурга дитячого", price: "255" },
  { category: "Медичні послуги", code: "96162-00", name: "Масаж голови", price: "70" },
  { category: "Медичні послуги", code: "96162-00", name: "Масаж обличчя", price: "70" },
  { category: "Медичні послуги", code: "96162-00", name: "Масаж шиї", price: "70" },
  { category: "Медичні послуги", code: "96162-00", name: "Масаж комірцевої зони", price: "85" },
  { category: "Медичні послуги", code: "96162-00", name: "Масаж шийно-грудного відділу хребта", price: "85" },
  { category: "Медичні послуги", code: "96162-00", name: "Масаж верхньої кінцівки, надпліччя й ділянки лопатки", price: "100" },
  { category: "Медичні послуги", code: "96162-00", name: "Масаж верхньої кінцівки", price: "85" },
  { category: "Медичні послуги", code: "96162-00", name: "Масаж плечового суглоба", price: "70" },
  { category: "Медичні послуги", code: "96162-00", name: "Масаж ліктьового суглоба", price: "70" },
  { category: "Медичні послуги", code: "96162-00", name: "Масаж променево-зап'ясткового суглобу", price: "70" },
  { category: "Медичні послуги", code: "96162-00", name: "Масаж кисті і передпліччя", price: "70" },
  { category: "Медичні послуги", code: "96162-00", name: "Масаж спини (від VII шийного до I поперекового хребця)", price: "100" },
  { category: "Медичні послуги", code: "96162-00", name: "Масаж спини (від VII шийного хребця до V поперекового хребця)", price: "100" },
  { category: "Медичні послуги", code: "96162-00", name: "Масаж грудної клітки", price: "115" },
  { category: "Медичні послуги", code: "96162-00", name: "Масаж передньої черевної стінки", price: "70" },
  { category: "Медичні послуги", code: "96162-00", name: "Масаж попереково-крижової ділянки", price: "70" },
  { category: "Медичні послуги", code: "96162-00", name: "Сегментарний масаж попереково-крижової ділянки", price: "85" },
  { category: "Медичні послуги", code: "96162-00", name: "Масаж ділянки хребта", price: "70" },
  { category: "Медичні послуги", code: "96162-00", name: "Масаж нижньої кінцівки і попереку", price: "100" },
  { category: "Медичні послуги", code: "96162-00", name: "Масаж кульшового суглоба", price: "70" },
  { category: "Медичні послуги", code: "96162-00", name: "Масаж колінного суглоба", price: "70" },
  { category: "Медичні послуги", code: "96162-00", name: "Масаж гомілковоступневого суглоба", price: "70" },
  { category: "Медичні послуги", code: "96162-00", name: "Масаж ступні і гомілки", price: "70" },
  { category: "Медичні послуги", code: "96162-00", name: "Загальний масаж у дітей грудного і ясельного віку", price: "130" },
  { category: "Медичні послуги", code: "96162-00", name: "Сегментарний масаж шийно-грудного відділу хребта", price: "85" },
  { category: "Медичні послуги", code: "96162-00", name: "Масаж нижньої кінцівки", price: "85" },
  { category: "Медичні послуги", code: "96115-00", name: "Терапевтичні вправи, м'язи обличчя/скронево-нижньощелепний суглоб", price: "130" },
  { category: "Медичні послуги", code: "96116-00", name: "Терапевтичні вправи, очні м'язи", price: "130" },
  { category: "Медичні послуги", code: "96117-00", name: "Терапевтичні вправи, м'язи стравоходу", price: "130" },
  { category: "Медичні послуги", code: "96118-00", name: "Терапевтичні вправи, плечовий суглоб", price: "220" },
  { category: "Медичні послуги", code: "96119-00", name: "Терапевтичні вправи, м'язи грудної клітки або живота", price: "220" },
  { category: "Медичні послуги", code: "96120-00", name: "Терапевтичні вправи, м'язи спини або шиї", price: "220" },
  { category: "Медичні послуги", code: "96121-00", name: "Терапевтичні вправи, м'язи руки", price: "230" },
  { category: "Медичні послуги", code: "96122-00", name: "Терапевтичні вправи, ліктьовий суглоб", price: "220" },
  { category: "Медичні послуги", code: "96123-00", name: "Терапевтичні вправи, м'язи кисті, променево-зап'ястковий суглоб або суглоби пальців", price: "225" },
  { category: "Медичні послуги", code: "96124-00", name: "Терапевтичні вправи, кульшовий суглоб", price: "225" },
  { category: "Медичні послуги", code: "96125-00", name: "Терапевтичні вправи, м'язи діафрагми таза", price: "225" },
  { category: "Медичні послуги", code: "96126-00", name: "Терапевтичні вправи, м'язи нижньої кінцівки", price: "230" },
  { category: "Медичні послуги", code: "96127-00", name: "Терапевтичні вправи, колінний суглоб", price: "230" },
  { category: "Медичні послуги", code: "96128-00", name: "Терапевтичні вправи, м'язи стопи, гомілковостопний суглоб або суглоби пальців стопи", price: "230" },
  { category: "Медичні послуги", code: "96129-00", name: "Терапевтичні вправи, усе тіло", price: "300" },
  { category: "Медичні послуги", code: "96130-00", name: "Тренування навичок, що стосуються положення/рухомості/рухів тіла", price: "235" },
  { category: "Медичні послуги", code: "96131-00", name: "Тренування навичок, що стосуються переміщення", price: "220" },
  { category: "Медичні послуги", code: "96139-00", name: "Вправи в басейні зі сторонньою допомогою", price: "260" },
  { category: "Медичні послуги", code: "96139-00", name: "Вправи в басейні без сторонньої допомоги", price: "260" },
  { category: "Медичні послуги", code: "96139-00", name: "Динамічна пропріоцентивна корекція (Метод К.О. Семенової)", price: "225" },
  { category: "Медичні послуги", code: "96139-00", name: "Заняття на ортопедичному вертикалізаторі", price: "140" },
  { category: "Медичні послуги", code: "96139-00", name: "Механотерапія на МОТОМЕДі", price: "140" },
  { category: "Медичні послуги", code: "96139-00", name: "Підвісна реабілітаційна терапія", price: "200" },
  { category: "Медичні послуги", code: "96139-00", name: "Заняття за системою «Павук»", price: "200" },
  { category: "Медичні послуги", code: "96139-00", name: "ЛФК у дітей грудного і ясельного віку", price: "115" },
  { category: "Медичні послуги", code: "96139-00", name: "Лікування положенням", price: "160" },
  { category: "Медичні послуги", code: "96139-00", name: "Механотерапія на велотренажері", price: "115" },
  { category: "Медичні послуги", code: "00000-00", name: "Тейпування кінезиотейпом 1 ділянки", price: "215" },
  { category: "Медичні послуги", code: "00000-00", name: "Біодинамічне тейпування", price: "225" },
  { category: "Медичні послуги", code: "00000-00", name: "Тейпування мімічних м'язів кростейпом", price: "145" },
  { category: "Медичні послуги", code: "96142-00", name: "Тренування навичок, що стосуються використання допоміжних або адаптивних засобів, пристроїв чи обладнання", price: "165" },
  { category: "Медичні послуги", code: "96140-00", name: "Тренування навичок, що стосуються догляду за собою/самообслуговування", price: "165" },
  { category: "Медичні послуги", code: "96143-00", name: "Тренування навичок, що стосуються самостійного прийняття їжі", price: "165" },
  { category: "Медичні послуги", code: "96112-00", name: "Тренування навичок, що стосуються сенсорної/сенсомоторної/нейросенсорної функції", price: "165" },
  { category: "Медичні послуги", code: "96113-00", name: "Тренування навичок, що стосуються пам'яті, орієнтації, сприйняття або уваги", price: "165" },
  { category: "Медичні послуги", code: "96150-00", name: "Навчання навичок, що стосуються методів які допомагають почуватися впевнено в воді (діти до 3-х років)", price: "165" },
  { category: "Медичні послуги", code: "96153-00", name: "Гідротерапія", price: "200" },
  { category: "Медичні послуги", code: "96151-00", name: "Суміжна медична інтервенція: фізіотерапія (парафіно - озокеритові аплікації мімічних м’язів)", price: "120" },
  { category: "Медичні послуги", code: "96151-00", name: "Суміжна медична інтервенція: фізіотерапія (парафіно - озокеритові аплікації верхніх або нижніх кінцівок)", price: "195" },
  { category: "Медичні послуги", code: "961151-00", name: "Суміжна медична інтервенція: фізіотерапія (Опромінювання різними джерелами світла)", price: "80" },
  { category: "Медичні послуги", code: "961151-00", name: "Суміжна медична інтервенція: фізіотерапія (Електрофорез лікарський постійного струму...)", price: "110" },
  { category: "Медичні послуги", code: "961151-00", name: "Суміжна медична інтервенція: фізіотерапія (імпульсне електромагнітне поле)", price: "110" },
  { category: "Медичні послуги", code: "961151-00", name: "Суміжна медична інтервенція: фізіотерапія (Міостимуляція будь-якої ділянки (1-а процедура))", price: "400" },
  { category: "Медичні послуги", code: "961151-00", name: "Суміжна медична інтервенція: фізіотерапія (Міостимуляція будь-якої ділянки (2-а - 10-а процедура))", price: "235" },
  { category: "Медичні послуги", code: "961151-00", name: "Суміжна медична інтервенція: фізіотерапія (Аерозольтерапія індивідуальна (інгаляції))", price: "80" },
  { category: "Медичні послуги", code: "961151-00", name: "Суміжна медична інтервенція: фізіотерапія (вібротерапія)", price: "75" },
  { category: "Медичні послуги", code: "961151-00", name: "Суміжна медична інтервенція: фізіотерапія (апаратний масаж ніг)", price: "75" },
  { category: "Медичні послуги", code: "961151-00", name: "Суміжна медична інтервенція: фізіотерапія (ультразвукова терапія)", price: "125" },
  { category: "Медичні послуги", code: "961151-00", name: "Суміжна медична інтервенція: фізіотерапія (дарсонвалізація місцева)", price: "100" },
  { category: "Медичні послуги", code: "961151-00", name: "Суміжна медична інтервенція: фізіотерапія (ультратонтерапія)", price: "100" },
  { category: "Медичні послуги", code: "961151-00", name: "Суміжна медична інтервенція: фізіотерапія (магнітотерапія)", price: "100" },
  { category: "Медичні послуги", code: "961151-00", name: "Суміжна медична інтервенція: фізіотерапія (синглетно-киснева терапія)", price: "60" },
  { category: "Медичні послуги", code: "961151-00", name: "Суміжна медична інтервенція: фізіотерапія (інгаляції синглетно-кисневою сумішшю)", price: "60" },
  { category: "Медичні послуги", code: "11000-00", name: "Електроенцефалографія", price: "465" },
  { category: "Медичні послуги", code: "11003-00", name: "Електроенцефалографія тривалістю ≥ 3 годин", price: "1140" },
  { category: "Медичні послуги", code: "11006-00", name: "Електроенцефалографія скронево-клиноподібної ділянки", price: "465" },
  { category: "Медичні послуги", code: "92011-00", name: "Електроенцефалографічний [ЕЕГ] відео- та радіотелеметричний моніторинг", price: "1205" },
  { category: "Медичні послуги", code: "11700-00", name: "Електрокардіографія [ЕКГ]", price: "290" },
  { category: "Медичні послуги", code: "55028-00", name: "Ультразвукове дослідження голови (нейросонографія)", price: "245" },
  { category: "Медичні послуги", code: "55036-00", name: "Ультразвукове дослідження черевної порожнини", price: "315" },
  { category: "Медичні послуги", code: "55038-00", name: "Ультразвукове дослідження сечовивідних шляхів", price: "110" },
  { category: "Медичні послуги", code: "55065-00", name: "Ультразвукове дослідження таза", price: "145" },
  { category: "Медичні послуги", code: "55084-00", name: "Ультразвукове дослідження сечового міхура", price: "110" },
  { category: "Медичні послуги", code: "55113-00", name: "Одновимірне (М-режим) та двовимірне ультразвукове дослідження серця у реальному часі", price: "175" },
  { category: "Медичні послуги", code: "55816-00", name: "Ультразвукове дослідження ділянки кульшового суглоба", price: "245" },
  { category: "Медичні послуги", code: "00000-00", name: "Ультразвукове дослідження щитоподібної залози", price: "175" },
  { category: "Медичні послуги", code: "00000-00", name: "Ультразвукове дослідження вилочкової залози", price: "175" },
  { category: "Медичні послуги", code: "90908-00", name: "Ультразвукове дослідження іншої ділянки тіла", price: "175" },
  { category: "Медичні послуги", code: "58900-00", name: "Рентгенографія живота", price: "120" },
  { category: "Медичні послуги", code: "57712-00", name: "Рентгенографія кульшових суглобів", price: "160" },
  { category: "Медичні послуги", code: "58500-00", name: "Рентгенографія грудної клітки", price: "120" },
  { category: "Медичні послуги", code: "58112-00", name: "Рентгенографія хребта, 2 відділів", price: "155" },
  { category: "Медичні послуги", code: "58115-00", name: "Рентгенографія хребта, 3 відділів", price: "155" },
  { category: "Медичні послуги", code: "58108-00", name: "Рентгенографія хребта, 4 відділів", price: "155" },
  { category: "Медичні послуги", code: "57506-00", name: "Рентгенографія плечової кістки", price: "120" },
  { category: "Медичні послуги", code: "57506-01", name: "Рентгенографія ліктя", price: "120" },
  { category: "Медичні послуги", code: "57512-00", name: "Рентгенографія ліктя та плечової кістки", price: "120" },
  { category: "Медичні послуги", code: "57512-01", name: "Рентгенографія ліктя та передпліччя", price: "120" },
  { category: "Медичні послуги", code: "57506-03", name: "Рентгенографія зап’ястка", price: "120" },
  { category: "Медичні послуги", code: "57506-04", name: "Рентгенографія кисті", price: "120" },
  { category: "Медичні послуги", code: "57512-03", name: "Рентгенографія кисті та зап’ястка", price: "120" },
  { category: "Медичні послуги", code: "57512-02", name: "Рентгенографія кисті, зап’ястка та передпліччя", price: "120" },
  { category: "Медичні послуги", code: "58700-00", name: "Рентгенографія сечовивідних шляхів нирок", price: "120" },
  { category: "Медичні послуги", code: "-", name: "Проживання пацієнта (1 доба)", price: "410" },
  { category: "Медичні послуги", code: "-", name: "Перебування у стаціонарі осіб, що перебувають з дитиною... (1 доба з ПДВ)", price: "410" },
  { category: "Медичні послуги", code: "-", name: "П'ятиразове харчування пацієнта (по віковій категорії)", price: "220-340" },
  { category: "Медичні послуги", code: "-", name: "Харчування пацієнта - обід (по віковій категорії)", price: "95-175" },
  { category: "Медичні послуги", code: "-", name: "Послуга з харчування (обід) для осіб... (з ПДВ)", price: "215" },
  { category: "Медичні послуги", code: "-", name: "Триразове харчування для осіб... (з ПДВ)", price: "340" },

  // --- ОСВІТНІ ПОСЛУГИ ---
  { category: "Освітні послуги", code: "ОП-01", name: "Консультація психолога", price: "225" },
  { category: "Освітні послуги", code: "ОП-02", name: "Консультація дефектолога", price: "230" },
  { category: "Освітні послуги", code: "ОП-03", name: "Консультація логопеда", price: "230" },
  { category: "Освітні послуги", code: "ОП-04", name: "Консультація педагога соціального", price: "150" },
  { category: "Освітні послуги", code: "ОП-05", name: "Психологічна діагностика", price: "300" },
  { category: "Освітні послуги", code: "ОП-06", name: "Логопедичне обстеження", price: "215" },
  { category: "Освітні послуги", code: "ОП-07", name: "Дефектологічне обстеження", price: "235" },
  { category: "Освітні послуги", code: "ОП-08", name: "Корекційно-розвиткове заняття з психологом", price: "260" },
  { category: "Освітні послуги", code: "ОП-09", name: "Корекційно-розвиткове заняття з логопедом", price: "240" },
  { category: "Освітні послуги", code: "ОП-10", name: "Корекційно-розвиткове заняття з дефектологом", price: "235" },
  { category: "Освітні послуги", code: "ОП-11", name: "Корекційно-розвиткове заняття в Арт-студії", price: "205" },
  { category: "Освітні послуги", code: "ОП-12", name: "Корекційно-розвиткове заняття з використанням плямографії", price: "185" },
  { category: "Освітні послуги", code: "ОП-13", name: "Корекційно-розвиткове заняття за методикою М. Монтессорі", price: "170" },
  { category: "Освітні послуги", code: "ОП-14", name: "Корекційно-розвиткове заняття з використанням музикотерапії", price: "165" },
  { category: "Освітні послуги", code: "ОП-15", name: "Корекційно-розвиткове заняття з використанням класичної пісочної терапії", price: "110" },
  { category: "Освітні послуги", code: "ОП-16", name: "Орофаціальний масаж (масаж мімічних м’язів)", price: "175" },
  { category: "Освітні послуги", code: "ОП-17", name: "Логопедичний масаж язика", price: "175" },
  { category: "Освітні послуги", code: "ОП-18", name: "Освітня послуга вихователя", price: "215" },
  { category: "Освітні послуги", code: "96134-00", name: "Тренування навичок відтворення звуків", price: "180" },
  { category: "Освітні послуги", code: "96135-00", name: "Тренування навичок мовлення", price: "180" },
  { category: "Освітні послуги", code: "96136-00", name: "Тренування навичок плавності мовлення", price: "180" },
  { category: "Освітні послуги", code: "96137-00", name: "Тренування навичок мови", price: "180" },
  { category: "Освітні послуги", code: "96184-00", name: "Тести на розвиток", price: "460" },
  { category: "Освітні послуги", code: "96238-00", name: "Обстеження когнітивної та /або поведінкової сфери", price: "460" },
];

export default function PaidServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Фільтрація послуг за пошуком
  const filteredServices = servicesData.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    service.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const medicalServices = filteredServices.filter(s => s.category === "Медичні послуги");
  const educationalServices = filteredServices.filter(s => s.category === "Освітні послуги");

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-slate-50 transition-colors duration-500 overflow-x-hidden">
      
      {/* АБСТРАКТНИЙ ФОН */}
      <div className="fixed inset-0 -z-50 h-full w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <div className="absolute left-0 right-0 top-[-10%] -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 dark:bg-blue-700 opacity-20 dark:opacity-30 blur-[100px]"></div>
      </div>

      <Header />

      <main className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ШАПКА СТОРІНКИ */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <FileText size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-slate-900 dark:text-white">
            Платні послуги
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
            Прозорі ціни на додаткові медичні та освітні послуги нашого центру. Ознайомтеся з прайсом онлайн або завантажте офіційний документ.
          </p>
          
          {/* ТУТ НАЛАШТОВАНА КНОПКА ЗАВАНТАЖЕННЯ */}
          <a 
            href="/documents/pricelist.pdf" 
            download="Прайс-лист_Вітрила_Життя.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition shadow-sm"
          >
            <Download size={18} />
            Завантажити повний прайс-лист (PDF)
          </a>
        </motion.div>

        {/* ПАНЕЛЬ ПОШУКУ */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }} className="mb-12">
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-slate-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Пошук послуги (наприклад: логопед, довідка...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white transition-all placeholder:text-slate-400"
            />
          </div>
        </motion.div>

        {/* ТАБЛИЦІ */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }} className="space-y-12">
          
          {/* Блок Медичних послуг */}
          {medicalServices.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center">
                  <Stethoscope size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Медичні послуги</h2>
              </div>
              
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto max-h-[600px]"> {/* Додав max-h та overflow, щоб довга таблиця гарно скролилась */}
                  <table className="w-full text-left border-collapse relative">
                    <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 z-10">
                      <tr className="border-b border-slate-200 dark:border-slate-700 text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        <th className="px-6 py-4 font-semibold w-24">Код</th>
                        <th className="px-6 py-4 font-semibold">Найменування послуги</th>
                        <th className="px-6 py-4 font-semibold text-right w-32">Вартість (грн)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                      {medicalServices.map((service, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">{service.code}</td>
                          <td className="px-6 py-4 text-slate-800 dark:text-slate-200 font-medium leading-relaxed">{service.name}</td>
                          <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-white whitespace-nowrap">{service.price} ₴</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Блок Освітніх послуг */}
          {educationalServices.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center">
                  <BookOpen size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Освітні послуги</h2>
              </div>
              
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto max-h-[600px]">
                  <table className="w-full text-left border-collapse relative">
                    <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 z-10">
                      <tr className="border-b border-slate-200 dark:border-slate-700 text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        <th className="px-6 py-4 font-semibold w-24">Код</th>
                        <th className="px-6 py-4 font-semibold">Найменування послуги</th>
                        <th className="px-6 py-4 font-semibold text-right w-32">Вартість (грн)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                      {educationalServices.map((service, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">{service.code}</td>
                          <td className="px-6 py-4 text-slate-800 dark:text-slate-200 font-medium leading-relaxed">{service.name}</td>
                          <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-white whitespace-nowrap">{service.price} ₴</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Якщо нічого не знайдено */}
          {filteredServices.length === 0 && (
            <div className="text-center py-12 bg-white/50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
              <p className="text-slate-500 dark:text-slate-400">За вашим запитом послуг не знайдено. Спробуйте змінити пошук.</p>
            </div>
          )}

        </motion.div>
      </main>

      <Footer />
    </div>
  );
}