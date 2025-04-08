import { Article } from '@/types'
import React from 'react'
import { ArticleCardProps } from './ArticleCard'

const ArticlesTags = ({article}: {article: Article}) => {
    return (
        <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
                <span
                    key={index}
                    className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm transition-colors duration-300 group-hover:bg-primary group-hover:text-white"
                >
                    {tag}
                </span>
            ))}
        </div>
    )
}

export default ArticlesTags