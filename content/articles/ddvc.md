---
title: "Data-driven view layer"
date: 2021-12-29T20:36:41+05:00
draft: true
---

Самое эффективное изменение кода я получил, когда начал уверенно применять философию data-driven подхода.

---

## Типичные проблемы

### Equatable, Hashable, Codable.

#### Equatable, Hashable

Зачем? Поддержка таблиц, сравнения текущего и прошлого состояния

#### Codable

Зачем? Возможность передачи объекта стейта, задания снаружи с помощью, например, json.

### Image

UIImage не поддерживает Equatable/Hashable. Что делать?

#### Картинка известна заранее?

Можно задать enum со всеми кейсами.

```swift
enum Icon {
	case user
	case icon

	var image: UIImage {
		switch self {
		case .user: return UIImage(named: "ic_user")
		case .icon: return UIImage(named: "ic_icon")
		}
	}
}
```

#### Источники

Демедецкий — несколько видео на ютубе. Презентации. Рассказы. Статьи. Планы на написание книги.

- [Data-driven View Controllers, Nov 2017](https://speakerdeck.com/dalog/data-driven-view-controllers-tips-and-tricks)

Виталий Малаховский из BetterMe — видео на ютубе

- [Data-Driven View Controllers, Oct 2018](https://speakerdeck.com/cocoaheadsukraine/data-driven-view-controllers)

Алгебраические типы статья
