---
title: "Swift Package Manager in 2021"
date: 2021-07-25T10:40:20+05:00
new: true
tags: SPM
---

**left**

- Как писать Package.swift для простого проекта
- Как тегать версии
- Как решать проблемы

## Вопросы

- Почему стоит уйти с Cocoapods?
- Как интегрировать пакеты? Что со сборкой на CI?
- Как структурировать пакеты в SwiftPM
- Как удобно разрабатывать
- Как выпускать версии пакетов и библиотек

## Почему стоит уйти с Cocoapods

SwiftPM поддерживает всё, что поддерживает Cocoapods и даже чуть больше.

Поддержка ресурсов работает. Пример описан в статье [useyourloaf](https://useyourloaf.com/blog/add-resources-to-swift-packages/)

### Умеет в версионирование

- Выбор версии до следующей мажорной (95% использования)
- Конкретная версия
- Конкретная ветка

## Как интегрировать пакеты и что со сборкой на CI

Пакеты можно добавлять через `File` > `Swift Packages`. Поиск по `url` пакета. Пакет скачается и попробует построить дерево совместимости.

![](/swiftpm/versions.png)

**Модули** выделять стало намного проще. `File` > `New` > `Swift Package`. Добавляя его в репозиторий и проект - появляется понятная структура. Структура повторяет файлы внутри, в отличие от наших обычных проектов. Генерируется папка тестов, автоматом считывается Scheme для билда и тестирования пакета. Зависимости можно объявить в Package.swift

`swift package` умеет создавать, собирать и запускать модули. Работает из коробки, т.к. поставляется вместе с Xcode.

## Как структурировать пакеты в SwiftPM

1 репозиторий = коллекция пакетов.

**Executable** — cli. Удобно разрабатывать с любыми пакетами, которые тоже поддерживают SwiftPM. [swift-argument-parser](https://github.com/apple/swift-argument-parser) — мощь.

**Library** — библиотека. Может быть как статической, так и динамической.

## Как удобно разрабатывать

Внутри проекта можно собрать такую иерархию файлов:

- 📁 Project (git repo)
  - 📄 Package.swift
  - 📄 Package.resolved
  - 📄 README.md
  - 📁 Sources (folder)
    - 📁 {{PackageName}} (folder)
  - 📁 Tests (folder)
    - 📁 {{PackageName}}Tests (folder)
  - 📁 Example (folder)
    - Example.xcodeproj
    - ... any structure of example project
  - 📄 Packages.xcworkspace
  - Packages.playground (еще не пробовал, но должно тоже работать)

xcworkspace файл объединит в себе две группы

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Workspace
   version = "1.0">
   <FileRef
    location = "group:.">
   </FileRef>
   <FileRef
      location = "group:Example/Example.xcodeproj">
   </FileRef>
</Workspace>
```

В таком случае xcworkspace повторяет всю структуру папок, при этом имея все схемы для сборки пакетов + схему для сборки Example проекта.

## Как решать проблемы.

Пакеты начинают резолвиться при открытии Xcode проекта. Если удалить пакеты, то они пропадут и билд не будет их видеть. Тогда нужно воспользоваться меню `File` > `Swift Packages` > `Resolve Package Versions`

**Проблемы кэширования** решаются удалением кэша 😀 Ссылка на него лежит в `~/.swiftpm/cache`. Оригинал лежит в `~/Library/Caches/org.swift.swiftpm`. Рядом с кэшем Cocoapods.

**Проблема совместимости** с тем, что модули не подходят друг другу решается вручную. Как, например, если мы поставим [RxSwift](https://github.com/ReactiveX/RxSwift) 6.0.0+ и последнюю версию [Moya](https://github.com/Moya/Moya/releases/tag/14.0.1), которая работает с RxSwift 5.0.0+. Тогда нужно явно указать, что версия RxSwift необходима старая. Автоматически это не решится, но лог пишется понятный.

![](/swiftpm/dependencies.png)

**Проблема с разными версиями одного пакета**

```
Dependencies could not be resolved because root depends on 'Moya' 14.0.1..<15.0.0 and root depends on 'Quick' 4.0.0..<5.0.0.
'Moya' >= 14.0.1 practically depends on 'Quick' 2.0.0..<3.0.0 because 'Moya' 14.0.1 depends on 'Quick' 2.0.0..<3.0.0 and no versions of 'Moya' match the requirement 14.0.2..<15.0.0.
```

TODO: Зависимости друг на друга

## Полезные ссылки

[Обзор по SwiftPM от Apple](https://swift.org/package-manager/)

[Документация по API SwiftPM в Package.swift файле](https://docs.swift.org/package-manager/)

[Публичный список доступных пакетов в SwiftPM](https://swiftpackageindex.com)
