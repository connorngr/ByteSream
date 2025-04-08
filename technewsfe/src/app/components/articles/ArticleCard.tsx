"use client"
import { Article } from "@/types";
import Link from "next/link";
import { motion } from "framer-motion";
import ArticlesTags from "./ArticlesTags";
import { useAuth } from "@/app/contexts/AuthContext";
import { FiBookmark, FiCheck } from "react-icons/fi";
import { saveArticle, unsaveArticle } from "@/app/api/articleApi";
import { useState } from "react";

export interface ArticleCardProps {
    article: Article;
    index: number;
    isSaved: boolean;
    onSaveToggle: (articleId: string, isSaved: boolean) => void;
}

export default function ArticleCard({ article, index, isSaved, onSaveToggle }: ArticleCardProps) {
    const { user } = useAuth();
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!user) return;
        
        setIsSaving(true);
        try {
            if (isSaved) {
                await unsaveArticle(article.id);
                onSaveToggle(article.id, false);
            } else {
                await saveArticle(article.id);
                onSaveToggle(article.id, true);
            }
        } catch (error) {
            console.error('Error saving article:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
        <Link href={`/articles/${article.id}`}>
            <div className="article bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full transform hover:-translate-y-1 group">
                {article.thumbnailUrl && (
                    <div className="w-full h-48 overflow-hidden">
                        <img
                            src={article.thumbnailUrl}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                )}
                <div className="p-6 flex-grow border-t-2 border-transparent group-hover:border-primary transition-colors duration-300">
                    <h2 className="text-2xl font-bold mb-3 text-gray-800 line-clamp-2 group-hover:text-primary transition-colors duration-300">{article.title}</h2>
                    <p className="text-gray-600 leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">{article.description}</p>
                    <div className="flex justify-between items-center mt-4">
                        <ArticlesTags article={article}/>
                        {user?.role == "USER" && (
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className={`ml-2 p-2 rounded-full transition-colors duration-300 ${
                                    isSaved 
                                    ? 'text-primary hover:text-gray-600' 
                                    : 'text-gray-400 hover:text-primary'
                                }`}
                            >
                                {isSaved ? <FiCheck size={20} /> : <FiBookmark size={20} />}
                            </button>
                        )}
                    </div>
                </div>
                <div className="h-1 bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:from-primary group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-300"></div>
            </div>
        </Link>        
        </motion.div>
    );
}
