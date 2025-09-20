"use client"

import { useState, useEffect } from "react"
import IdeaForm from "@/components/IdeaForm"
import IdeaCard from "@/components/IdeaCard"

export default function HomePage() {
  const [ideas, setIdeas] = useState([])
  const [editingIdea, setEditingIdea] = useState(null)
  const [selectedTag, setSelectedTag] = useState(null)

  // Load ideas from localStorage
  useEffect(() => {
    const savedIdeas = localStorage.getItem("ideas")
    if (savedIdeas) {
      setIdeas(JSON.parse(savedIdeas))
    }
  }, [])

  // Save ideas to localStorage
  useEffect(() => {
    localStorage.setItem("ideas", JSON.stringify(ideas))
  }, [ideas])

  // Add a new idea
  const addIdea = (newIdea) => {
    const idea = {
      id: Date.now(),
      title: newIdea.title,
      content: newIdea.content,
      tags: newIdea.tags || [],
      createdAt: new Date().toLocaleDateString("ko-KR"),
    }
    setIdeas([idea, ...ideas])
  }

  // Update an existing idea
  const updateIdea = (updatedIdea) => {
    setIdeas(ideas.map((idea) => (idea.id === updatedIdea.id ? updatedIdea : idea)))
    setEditingIdea(null)
  }

  // Delete an idea
  const deleteIdea = (id) => {
    setIdeas(ideas.filter((idea) => idea.id !== id))
  }

  // Start editing an idea
  const startEditing = (idea) => {
    setEditingIdea(idea)
  }

  // Cancel editing
  const cancelEditing = () => {
    setEditingIdea(null)
  }

  // Get all unique tags
  const allTags = [...new Set(ideas.flatMap(idea => idea.tags || []))].filter(Boolean)

  // Filter ideas by selected tag
  const filteredIdeas = selectedTag
    ? ideas.filter(idea => idea.tags?.includes(selectedTag))
    : ideas

  return (
    <div className="min-h-screen bg-transparent">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">🌿 그린 아이디어 노트</h1>
          <p className="text-gray-600 dark:text-gray-300">아이디어를 태그와 함께 기록하고 관리하세요</p>
        </div>

        {/* Idea Form */}
        <div className="mb-8">
          <IdeaForm 
            onSubmit={editingIdea ? updateIdea : addIdea} 
            editingIdea={editingIdea} 
            onCancel={cancelEditing}
            allTags={allTags}
          />
        </div>

        {/* Tag Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">태그 필터:</span>
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 text-sm rounded-full ${
                !selectedTag 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              모두 보기
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedTag === tag
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Ideas List */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            {selectedTag ? `'${selectedTag}' 태그의 아이디어` : '모든 아이디어'}
            <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
              ({filteredIdeas.length}개)
            </span>
          </h2>
          
          {filteredIdeas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                {selectedTag 
                  ? `'${selectedTag}' 태그가 있는 아이디어가 없습니다.` 
                  : '아직 아이디어가 없습니다. 새로운 아이디어를 추가해보세요!'}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredIdeas.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  onEdit={startEditing}
                  onDelete={deleteIdea}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
