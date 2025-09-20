"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function IdeaForm({ onSubmit, editingIdea, onCancel }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState([])

  // 편집 모드일 때 폼에 기존 데이터 채우기
  useEffect(() => {
    if (editingIdea) {
      setTitle(editingIdea.title)
      setContent(editingIdea.content)
      setTags(editingIdea.tags || [])
    } else {
      setTitle("")
      setContent("")
      setTags([])
    }
    setTagInput("")
  }, [editingIdea])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요!")
      return
    }

    if (editingIdea) {
      // 수정 모드
      onSubmit({
        ...editingIdea,
        title: title.trim(),
        content: content.trim(),
        tags: [...tags]
      })
    } else {
      // 새 아이디어 추가
      onSubmit({
        title: title.trim(),
        content: content.trim(),
        tags: [...tags]
      })
    }

    // 폼 초기화
    setTitle("")
    setContent("")
  }

  const handleCancel = () => {
    setTitle("")
    setContent("")
    setTags([])
    setTagInput("")
    onCancel()
  }

  const addTag = (e) => {
    e.preventDefault()
    const tag = tagInput.trim()
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{editingIdea ? "✏️ 아이디어 수정" : "➕ 새 아이디어 추가"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="아이디어 제목을 입력하세요..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-base bg-green-50 dark:bg-green-900/20 border-2 border-green-100 dark:border-green-800/50 focus:border-green-400 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-800/30 rounded-lg p-3 transition-colors"
            />
          </div>

          <div>
            <Textarea
              placeholder="아이디어 내용을 자세히 적어보세요..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="text-base resize-none mb-3 bg-green-50 dark:bg-green-900/20 border-2 border-green-100 dark:border-green-800/50 focus:border-green-400 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-800/30 rounded-lg p-3 transition-colors"
            />

            {/* 태그 입력 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="태그를 입력하세요..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ',') {
                      e.preventDefault()
                      addTag(e)
                    }
                  }}
                  className="flex-1 bg-green-50 dark:bg-green-900/20 border-2 border-green-100 dark:border-green-800/50 focus:border-green-400 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-800/30 rounded-lg p-2 transition-colors"
                />
                <Button type="button" onClick={addTag} className="bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800">
                  추가
                </Button>
              </div>
              
              {/* 태그 목록 */}
              <div className="flex flex-wrap gap-2 min-h-8">
                {tags.map((tag) => (
                  <div key={tag} className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-sm">
                    <span>#{tag}</span>
                    <button 
                      type="button" 
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              {editingIdea ? "수정 완료" : "아이디어 저장"}
            </Button>

            {editingIdea && (
              <Button type="button" variant="outline" onClick={handleCancel}>
                취소
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
