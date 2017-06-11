import React from 'react'

export default function template() {

	let totalCount = this.state.totalCount,
		lastNumber = totalCount % 10;

	return totalCount > 0 ? <span>
        Всего {totalCount} {' '}
		{lastNumber === 1 && 'наименование'}
		{lastNumber > 1 && lastNumber < 5 && 'наименования'}
		{lastNumber === 0 || lastNumber >= 5 && 'наименований'}
	</span> : null
}

