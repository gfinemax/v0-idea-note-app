"use client"

import { useState, useEffect } from "react"
import IdeaForm from "@/components/IdeaForm"
import IdeaCard from "@/components/IdeaCard"

export default function HomePage() {
  const [ideas, setIdeas] = useState([])
  const [editingIdea, setEditingIdea] = useState(null)

  // localStorage에서 아이디어 불러오기
  useEffect(() => {
    const savedIdeas = localStorage.getItem("ideas")
    if (savedIdeas) {
      setIdeas(JSON.parse(savedIdeas))
    }
  }, [])

  // localStorage에 아이디어 저장하기
  useEffect(() => {
    localStorage.setItem("ideas", JSON.stringify(ideas))
  }, [ideas])

  // 새 아이디어 추가
  const addIdea = (newIdea) => {
    const idea = {
      id: Date.now(),
      title: newIdea.title,
      content: newIdea.content,
      createdAt: new Date().toLocaleDateString("ko-KR"),
    }
    setIdeas([idea, ...ideas])
  }

  // 아이디어 수정
  const updateIdea = (updatedIdea) => {
    setIdeas(ideas.map((idea) => (idea.id === updatedIdea.id ? updatedIdea : idea)))
    setEditingIdea(null)
  }

  // 아이디어 삭제
  const deleteIdea = (id) => {
    setIdeas(ideas.filter((idea) => idea.id !== id))
  }

  // 편집 모드 시작
  const startEditing = (idea) => {
    setEditingIdea(idea)
  }

  // 편집 취소
  const cancelEditing = () => {
    setEditingIdea(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">💡 아이디어 노트</h1>
          <p className="text-muted-foreground">떠오르는 아이디어를 간단하게 기록하고 관리하세요</p>
        </div>

        {/* 아이디어 입력 폼 */}
        <div className="mb-8">
          <IdeaForm onSubmit={editingIdea ? updateIdea : addIdea} editingIdea={editingIdea} onCancel={cancelEditing} />
        </div>

        {/* 아이디어 목록 */}
        <div className="space-y-4">
          {ideas.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">아직 아이디어가 없습니다</h3>
              <p className="text-muted-foreground">위의 폼을 사용해서 첫 번째 아이디어를 추가해보세요!</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {ideas.map((idea) => (
                <IdeaCard key={idea.id} idea={idea} onEdit={startEditing} onDelete={deleteIdea} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
