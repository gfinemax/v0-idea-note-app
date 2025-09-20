"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function IdeaForm({ onSubmit, editingIdea, onCancel }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  // 편집 모드일 때 폼에 기존 데이터 채우기
  useEffect(() => {
    if (editingIdea) {
      setTitle(editingIdea.title)
      setContent(editingIdea.content)
    } else {
      setTitle("")
      setContent("")
    }
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
      })
    } else {
      // 새 아이디어 추가
      onSubmit({
        title: title.trim(),
        content: content.trim(),
      })
    }

    // 폼 초기화
    setTitle("")
    setContent("")
  }

  const handleCancel = () => {
    setTitle("")
    setContent("")
    onCancel()
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
              className="text-base"
            />
          </div>

          <div>
            <Textarea
              placeholder="아이디어 내용을 자세히 적어보세요..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="text-base resize-none"
            />
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
